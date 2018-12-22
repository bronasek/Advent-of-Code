// 07 - The Sum of Its Parts - Part One

const fs = require('fs');

const partOne = () => {
   let inputValues = fs.readFileSync('./input.txt').toString().split("\n")
      .map(elem => elem.match(/ [A-Z] /g).map(elem => elem.trim()));
   
   const letters = [].concat(...inputValues).filter((e, i, a) => i == a.indexOf(e));

   let arrayOfOccuring = [];
   let result = "";

   for (let i = 0; i < letters.length; i++) {
      arrayOfOccuring.push({ letter: letters[i], before: inputValues
         .filter(elem => elem[1] == letters[i])
         .map(elem => elem[0])
      });
   }
   
   while(arrayOfOccuring.length) {
      const getNext = arrayOfOccuring.filter(elem => !elem.before.length)
         .sort((a, b) => b.letter > a.letter ? -1 : 1)[0];
      arrayOfOccuring.splice(arrayOfOccuring.indexOf(getNext), 1);
      result += getNext.letter;
      arrayOfOccuring.filter(elem => elem.before.includes(getNext.letter))
         .forEach(elem => {
            elem.before.splice(elem.before.indexOf(getNext.letter), 1)
         });
   }

   console.log(result);
}

partOne();