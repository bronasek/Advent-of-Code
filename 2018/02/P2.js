// 02 - Inventory Management System - Part Two

const fs = require('fs');

const partTwo = () => {
   let inputValues = fs.readFileSync('./input.txt').toString().split(',');
   let diffAm;
   let result = [];
   
   let toCheck = inputValues.length;
   
   for (let checking = 0; checking < toCheck - 1; checking++) {
      for (let i = checking + 1; i < toCheck; i++) {
         diffAm = 0;
         for (let j = 0; j < inputValues[checking].length; j++) {
            if (diffAm < 2) {
               if (inputValues[checking][j] !== inputValues[i][j]) {
                  diffAm++;
                  result[0] = j;
               }
            } else {
               break;
            }
         }
         if (diffAm < 2) {
            result.push(inputValues[checking]);
            result.push(inputValues[i]);
            break;
         }
      }
      if (result.length > 1) {
         break;
      }
   }
   
   return result[1].split("").slice(0, result[0]).join("") + result[1].split("").slice(result[0] + 1).join("");
}

partTwo();