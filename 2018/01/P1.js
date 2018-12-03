// 01 - Chronal Calibration - Part One

const fs = require('fs');
const readline = require('readline');

// FS
const partOne = () => {
   console.time('Part One');
   let inputValues = [];
   let result = 0;
   
   inputValues = fs.readFileSync('./input.txt').toString().split('\n');
   result = inputValues.reduce( (acc, val) => acc + +val, 0);
   
   console.timeEnd('Part One');
   console.log('Part One : ' + result);
}

partOne();

// Part One: 1.333ms
// Part One : xxx

// ReadLine
const partOneRL = () => {
   console.time('Part OneRL');
   let rl = readline.createInterface({
      input: fs.createReadStream('./input.txt')
   });
   let result = 0;
   let lineno = 0;
   
   rl.on('line', function (line) {
      lineno++;
      result += +line;
   });
   
   rl.on('close', () => {
      console.timeEnd('Part OneRL');
      console.log('Part OneRL : ' + result);
   });
}

partOneRL();

// Part OneRL: 8.628ms
// Part OneRL : xxx