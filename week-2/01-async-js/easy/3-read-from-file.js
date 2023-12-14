const fs = require ('fs');
const inputFilePath = './file.txt';

fs.readFile (inputFilePath, 'utf-8', (err, data) => {
  if (err) throw err;
  console.log (data);
});

// let a = 0;
// for (let i = 0; i < 100000000000; i++) {
//   a++;
// }
// if we perform some heavy operation first, it would be executed first and thus the output of fs.readFile will take some time.
