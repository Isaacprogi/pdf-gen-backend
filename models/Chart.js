const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
    crime: String,
    chartData: [{ year: String, rate: Number }],
},{
    timestamps:true,
});

module.exports = Chart = mongoose.model('ChartData', chartDataSchema);