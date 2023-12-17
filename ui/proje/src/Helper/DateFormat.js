export const DateTimeFormat = (date) =>{
    const originalDate = new Date(Date.UTC(
        parseInt(date.slice(0, 4)),
        parseInt(date.slice(5, 7)) - 1,
        parseInt(date.slice(8, 10)),
        parseInt(date.slice(11, 13)),
        parseInt(date.slice(14, 16)),
        parseInt(date.slice(17, 19))
      ));
      return originalDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}