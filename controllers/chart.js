const Chart = require('../models/Chart');

exports.createChart = async(req,res,next) => {
    try {
        const chart = new Chart(req.body)
        await chart.save()
        res.send('success')
      } catch (error) {
        console.error(error);
        return next({ message: 'Internal Server Error' });
      }
}

  
exports.getChart = async (req, res, next) => {
    try {
        const chart = Chart.findById({_id:req.params.id})
        res.status(200).json(chart)
      } catch (error) {
        console.error(error);
        return next({ message: 'Internal Server Error' });
      }
};



exports.getCharts = async (req, res, next) => {
    try {
        const charts = await Chart.find()
        res.status(200).json(charts)
    } catch (error) {
        return next({ message: 'Internal Server Error' });
    }
}




exports.deleteChart = async (req, res, next) => {
    try {
        const { id } = req.params
        const chart = await Chart.findByIdAndDelete({ _id: id }, { new: true })
        if (!chart) {
            return next({ message: 'chart does not exist' })
        }
        res.status(200).send('Pdf deleted')
    } catch (error) {
        console.log(error)
        return next({ message: 'Internal Server Error' });
    }
}

