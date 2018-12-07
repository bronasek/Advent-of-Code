// 03 - No Matter How You Slice It - Part One

const fs = require('fs');

let claim = '#1 @ 257,829: 10x23';

const partOne = () => {
   let inputValues = fs.readFileSync('./input.txt').toString().split("\n");
   let fabric = {};
   let result = 0;
   
   // for (let claim of inputValues) {
      let newclaim = claim.replace(/\D/g, " ").replace(/\s+/g, " ").replace(/^(\s\d\s)/g, "").split(" ");
      let left = newclaim[0];
      let top = newclaim[1];
      let width = newclaim[2];
      let height = newclaim[3];
      
      for (let i = newclaim[1]; i < newclaim[1] + newclaim[3]; i++) {
         for (let j = newclaim[0]; j < newclaim[0] + newclaim[2]; j++) {
            const w = fabric && fabric.i ? fabric.i.j : null;
            // if (fabric.i.w) {
               fabric[i][w] = true;
            // } else {
               // result++;
            // }
         }
      }
      
      console.log(result);
      
      
   // }
   
}

partOne();