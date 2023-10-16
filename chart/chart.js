const { createCanvas } = require('canvas');
const { Chart,registerables } = require('chart.js');
Chart.register(...registerables);

const chart = (chartData) => {
        const canvas = createCanvas(475, 151);
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
           return chartDataUrl;
}

module.exports = chart