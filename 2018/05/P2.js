// 05 - Alchemical Reduction - Part Two

const fs = require('fs');

let inputValues = [];
inputValues = fs.readFileSync('./input.txt').toString().split("");

const partTwoReduction = (input) => {
   const checkCapital = (i, iPlus1) => {
      if ( (/[a-z]/.test(i) && /[A-Z]/.test(iPlus1)) || (/[A-Z]/.test(i) && /[a-z]/.test(iPlus1)) ) {
         return true;
      }
      return false;
   }
   
   for (let i = 0; i < input.length - 1; ) {
      if(input[i].toUpperCase() === input[i + 1].toUpperCase()
         && checkCapital(input[i], input[i + 1])) {
         input.splice(i, 2);
         if (i > 0) {
            i--;
         } 
      } else {
         i++;
      }
   }
   
   return input;
}

const partTwoResult = () => {
   let initialReduction = partTwoReduction(inputValues);
   let result = initialReduction.length;
   
   for (let i = 65; i <= 90; i++) {
      const reducedInput = initialReduction.filter( val => val.charCodeAt(val) !== i && val.charCodeAt(val) !== (i + 32) );
      const doubleReduction = partTwoReduction(reducedInput).length;
      doubleReduction < result ? result = doubleReduction : result;
   }
   
   console.log(result);
}

partTwoResult();