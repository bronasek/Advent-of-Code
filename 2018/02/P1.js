// 02 - Inventory Management System - Part One

const fs = require('fs');

const partOne = () => {
   let inputValues = [];
   let twice = 0;
   let threeTimes = 0;
   let result = 0;
   
   inputValues = fs.readFileSync('./input.txt').toString().split(",");
   
   for (let str of inputValues) {
      let temp = {};
      for (let i = 0; i < str.length; i++) {
         if (!Object.values(temp).includes(2) || !Object.values(temp).includes(3)) {
            if (i != str.lastIndexOf(str.charAt(i))) {
               if (!temp[str[i]]) {
                  temp[str[i]] = 2; 
               } else {
                  temp[str[i]] += 1;
               }
            } 
         } else {
            break;
         }
      }
      if (Object.values(temp).includes(2)) twice++;
      if (Object.values(temp).includes(3)) threeTimes++;
   }
   
   result = twice * threeTimes;
   
   console.log(twice);
   console.log(threeTimes);
   console.log(result);
}

partOne();