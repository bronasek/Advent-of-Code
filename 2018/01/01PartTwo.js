// 01 - Chronal Calibration - Part Two

const fs = require('fs');

const partTwo = () => {
   console.time('Part Two');
   let frequencies = ['0'];
   let acc = 0;
   let result = "";
   const inputValues = fs.readFileSync('./input.txt').toString().split('\n');
   
   while (!result) {
      for (let val of inputValues) {
         acc += +val;
         if (frequencies.includes(acc)) {
            result = acc;
            break;
         } else {
            frequencies.push(acc);
         }
      }
   }
   
   console.timeEnd('Part Two');
   console.log('Part Two : ' + result);
}

partTwo();