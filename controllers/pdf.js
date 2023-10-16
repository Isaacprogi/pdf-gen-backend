const pdf = require('pdf-creator-node');
const fs = require('fs');
const path = require('path');
const ChartModel = require('../models/Chart');
const { cloudinary } = require('../config/cloudinaryConfig');
const pdfTemplate = require('../document/document');
const chart = require('../chart/chart')
const { Chart, registerables } = require('chart.js');
Chart.register(...registerables);



exports.createPdf = async (req, res,next) => {
    const { crime, chartData } = req.body;

    try {
        const template = fs.readFileSync(
            path.join(__dirname, '..', 'template', 'template.html'),
            'utf-8'
        );

        const chartDataUrl = chart(chartData);

        const options = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm',
        };

        const document = {
            html: template,
            data: {
                crime,
                chartDataUrl,
            },
            path: path.join(__dirname, '..', 'pdf', 'crime.pdf'),
        };

        pdf.create(document, options)
            .then((data) => {
                uploadToCloudinaryAndSaveToDatabase(crime,chartData,res,next);
                res.status(200).json(data)
            })
            .catch((err) => {
                console.log('Error generating PDF:', err);
                res.status(500).json({ error: 'PDF generation failed' });
            });
          
    } catch (error) {
        console.log('Error generating PDF:', err);
        res.status(400).json(error);
    }
};




exports.fetchPdf = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'pdf', 'crime.pdf'));
};



exports.recreateSaved = async (req, res, next) => {
    try {
        const { id } = req.params
        const chart = await ChartModel.findById({ _id: id })
        const htmlContent = `<img src="${chart.chartDataUrl}" />`;
        pdf.create(pdfTemplate({ htmlContent, crime: chart?.crime }), { format: 'Letter', orientation: 'portrait' }).toFile('crime.pdf', (err) => {
            if (err) {
                res.status(500).send('Error generating PDF');
            } else {
                res.status(200).send('successful');
            }
        });
    } catch (error) {
        console.log('Error generating PDF:', error);
        return next({ message: 'Error generating PDF' });
    }
}




exports.getAllSavedPdfs = async (req, res, next) => {
    try {
        const chart = await ChartModel.find()
        res.status(200).json(chart)
    } catch (error) {
        return next({ message: 'Internal Server Error' });
    }
}




exports.deletePdf = async (req, res, next) => {
    try {
        const { id } = req.params
        const chart = await ChartModel.findByIdAndDelete({ _id: id }, { new: true })
        if (!chart) {

            return next({ message: 'Pdf does not exist' })
        }
            await cloudinary.uploader.destroy(chart?.publicId, {
            resource_type: "raw",
            invalidate: true,
        });
        res.status(200).send('Pdf deleted')
    } catch (error) {
        return next({ message: 'Internal Server Error' });
    }
}



async function uploadToCloudinaryAndSaveToDatabase(crime,chartData,res,next) {
    try {
        const uploadedResponse = await cloudinary.uploader.upload(
            path.join(__dirname, '..', 'pdf', 'crime.pdf'),
            {
                uploadpreset: 'real_assist',
                resource_type: 'raw',
            }
        );

        const { id, ...others } = chartData;
        const chartModel = new ChartModel({
            crime,
            chartData: others,
            url: uploadedResponse.url,
            publicId: uploadedResponse.public_id,
        });

        await chartModel.save();
        res.sendFile(path.join(__dirname, '..', 'pdf', 'crime.pdf'));
    } catch (error) {
        console.error('Error during upload and save:', error);
        next({message:'Error during upload and save:', error})
    }
}
