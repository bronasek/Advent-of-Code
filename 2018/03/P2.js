// 03 - No Matter How You Slice It - Part Two

const fs = require('fs');

const partTwo = () => {
   let inputValues = fs.readFileSync('./input.txt').toString().split("\n");
   let fabric = new Array(1000).fill(null).map(() => new Array(1000).fill(0));
   let noOverlapArray = [];
   
   const removeFromArray = (overlapId) => {
      let index = noOverlapArray.indexOf(overlapId);
      if (index > -1) {
         noOverlapArray.splice(index, 1);
      }
   } 
   
   for (let id = 1; id <= inputValues.length; id++) {
      let newclaim = inputValues[id - 1].replace(/\D/g, " ").split(/\s+/g);
      let left = +newclaim[2];
      let top = +newclaim[3];
      let width = +newclaim[4];
      let height = +newclaim[5];
      let overlap = false;
      
      for (let i = top; i < (top + height); i++) {
         for (let j = left; j < (left + width); j++) {
            if (fabric[i][j] > 0) {
               removeFromArray(fabric[i][j]);
               overlap = true;
            }
               fabric[i][j] = id;
         }
      }
      
      if (overlap === false) {
         noOverlapArray.push(id);
      } 
   }
   console.log(noOverlapArray);
}

partTwo();