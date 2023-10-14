const pdf = require('html-pdf');
const path = require('path');
const { createCanvas } = require('canvas');
const pdfTemplate = require('../document/document');
const ChartModel = require('../models/Chart');
const {cloudinary} = require('../config/cloudinaryConfig');
const fs = require('fs');
const puppeteer = require('puppeteer');
const NodeCache = require('node-cache');
const pdfCache = new NodeCache();


exports.createPdf = async (req, res, next) => {
    const { crime, chartData } = req.body;

    if (!crime || !chartData) {
        return res.status(400).send({ message: 'Missing crime or chartData' });
    }

    try {
        const canvas = createCanvas(475, 200);
        const ctx = canvas.getContext('2d');

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData ? chartData.map(data => data.year) : [],
                datasets: [
                    {
                        backgroundColor: 'transparent',
                        borderColor: '#1463FF',
                        borderWidth: 2,
                        pointBorderColor: 'transparent',
                        pointBorderWidth: 4,
                        data: chartData ? chartData.map(data => data.rate) : [],
                    },
                ],
            },
            options: {
                plugins: {
                    legend: false,
                },
                scales: {
                    x: {
                        type: 'category',
                        grid: {
                            color: '#BAC2DB',
                        },
                        ticks: {
                            color: '#626E99',
                        },
                    },
                    y: {
                        grid: {
                            color: '#BAC2DB',
                        },
                        ticks: {
                            color: '#626E99',
                        },
                    },
                },
            },
        });

        
        const chartDataUrl = canvas.toDataURL();

        
        const htmlContent = `<img src="${chartDataUrl}" />`;
        const template = pdfTemplate({ crime, htmlContent });

      
        pdf.create(template,{ format: 'A4' }).toFile(path.join(__dirname, '..', 'pdf', 'crime.pdf'), async (pdfError, pdfResponse) => {
            if (pdfError) {
                return next({ message: 'Error generating PDF' });
            }

            try {
                const uploadedResponse = await cloudinary.uploader.upload(
                    path.join(__dirname, '..', 'pdf', 'crime.pdf'),
                    {
                        uploadpreset: 'real_assist',
                        resource_type: "raw"
                        
                    }
                );

                const { id, ...others } = chartData;
                const chartModel = new ChartModel({
                    crime,
                    chartData: others,
                    url: uploadedResponse.url,
                    publicId: uploadedResponse.public_id
                });

                await chartModel.save();

                // Return the PDF as a response
                return res.status(200).sendFile(path.join(__dirname, '..', 'pdf', 'crime.pdf'));
            } catch (error) {
                return next({ message: 'Error uploading PDF' });
            }
        });
    } catch (error) {
        return next({ message: 'Error generating PDF' });
    }
};



exports.fetchPdf = async (req, res,next) => {
    res.sendFile(path.join(__dirname, '..', 'pdf','crime.pdf'));
};


exports.recreateSaved = async (req, res,next) => {
    try {
        const { id } = req.params
        const chart = await ChartModel.findById({ _id: id })
        const htmlContent = `<img src="${chart.chartDataUrl}" />`;
        pdf.create(pdfTemplate({ htmlContent, crime:chart?.crime }), { format: 'Letter', orientation: 'portrait' }).toFile('crime.pdf', (err) => {
            if (err) {
                res.status(500).send('Error generating PDF');
            } else {
                res.status(200).send('successful');
            }
        });
    } catch (error) {
        return next({ message: 'Error generating PDF' });
    }
}



exports.getAllSavedPdfs = async(req,res,next)=> {
    try{
        const chart = await ChartModel.find()
        res.status(200).json(chart)
    }catch(error){
        return next({ message: 'Internal Server Error' });
    }
}


exports.deletePdf = async (req, res, next) => {
    try {
        const { id } = req.params
        const chart = await ChartModel.findByIdAndDelete({_id:id},{new:true})
        if(!chart){
          
            return next({ message:'Pdf does not exist' })
        }
        const result = await cloudinary.uploader.destroy(chart?.publicId,{
            resource_type: "raw",
             invalidate: true,
        });
        res.status(200).send('Pdf deleted')
    } catch (error) {
   
        return next({ message: 'Internal Server Error' });
    }
}
