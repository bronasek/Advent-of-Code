// 03 - No Matter How You Slice It - Part One

const fs = require('fs');

const partOne = () => {
   let inputValues = fs.readFileSync('./input.txt').toString().split("\n");
   let fabric = new Array(1000).fill(null).map(() => new Array(1000).fill(0));
   let result = 0;
   
   for (let claim of inputValues) {
      let newclaim = claim.replace(/\D/g, " ").split(/\s+/g);
      
      let left = +newclaim[2];
      let top = +newclaim[3];
      let width = +newclaim[4];
      let height = +newclaim[5];
      
      for (let i = top; i < (top + height); i++) {
         for (let j = left; j < (left + width); j++) {
            if (fabric[i][j] === 1) {
               result++;
            }
               fabric[i][j]++;
         }
      }
   }
   
   console.log(result);
}

partOne();