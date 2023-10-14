function formatDateToCustomString() {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
  
    const formattedDate = `Report Generated on ${month} ${day}, ${year}`;
  
    return formattedDate;
  }
  
module.exports = formattedDateString = formatDateToCustomString();
