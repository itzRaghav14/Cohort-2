const fs = require('fs');
const filePath = './file.txt';

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) throw err;
  data = data.replace(/\s+/g, ' ').trim();
  fs.writeFile(filePath, data, 'utf-8', (err) => {
    if (err) throw err;
    console.log('File has been cleaned');
  })
})