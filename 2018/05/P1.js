// 05 - Alchemical Reduction - Part One

const fs = require('fs');

const partOne = () => {
   let inputValues = [];
   inputValues = fs.readFileSync('./input.txt').toString().split("");
   
   const checkCapital = (i, iPlus1) => {
      if ( (/[a-z]/.test(i) && /[A-Z]/.test(iPlus1)) || (/[A-Z]/.test(i) && /[a-z]/.test(iPlus1)) ) {
         return true;
      }
      return false;
   }
   
   for (let i = 0; i < inputValues.length - 1; ) {
      if(inputValues[i].toUpperCase() === inputValues[i + 1].toUpperCase()
         && checkCapital(inputValues[i], inputValues[i + 1])) {
         inputValues.splice(i, 2)
         if (i > 0) {
            i--;
         }
      } else {
         i++;
      }
   }
   
   console.log(inputValues.length);
}

partOne();