const fs = require ('fs');
const outputFilePath = './file.txt';
const content = 'The file is so cool';

fs.writeFile (outputFilePath, content, 'utf-8', (err) => {
  if (err) throw err;
  console.log ('Some new content has been written in the file');
});