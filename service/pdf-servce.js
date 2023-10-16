PDFdocument = require('pdfkit')

function buildPDF(dataCallback,endCallback){ 
    const doc = new PDFdocument()
    doc.on('data',dataCallback)
    doc.on('end',endCallback)
    doc.fontSize(25)
    .text('some heading')
    doc.end()

}

module.exports = {buildPDF}