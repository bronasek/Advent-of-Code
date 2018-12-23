// 07 - The Sum of Its Parts - Part Two

const fs = require('fs');

const partTwo = () => {
   let inputValues = fs.readFileSync('./input.txt').toString().split("\n")
      .map(elem => elem.match(/ [A-Z] /g).map(elem => elem.trim()));
   
   const letters = [].concat(...inputValues).filter((e, i, a) => i == a.indexOf(e));

   let arrayOfOccuring = [];
   let order = [];
   let result = 0;

   for (let i = 0; i < letters.length; i++) {
      arrayOfOccuring.push({ letter: letters[i], before: inputValues
         .filter(elem => elem[1] == letters[i])
         .map(elem => elem[0])
      });
   }
   
   let arrayOfOccuringPartTwo = arrayOfOccuring.slice();
   
   const workers = [
      { worker: 0, stepTime: 0 },
      { worker: 1, stepTime: 0 },
      { worker: 2, stepTime: 0 },
      { worker: 3, stepTime: 0 },
      { worker: 4, stepTime: 0 }
   ];
   
   while(arrayOfOccuringPartTwo.length) {
      const getNext = arrayOfOccuringPartTwo.filter(elem => !elem.before.length)
         .sort((a, b) => b.letter > a.letter ? -1 : 1);
         
      for (let i = 0; i < getNext.length; i++) {
         const getWorker = workers.filter(elem => !elem.stepTime)
            .sort((a, b) => b.worker > a.worker ? -1 : 1)[0];
         if (getWorker) {
            workers[getWorker.worker].stepTime += getNext[i].letter.charCodeAt(0) - 4;
         }
      } 
         
      arrayOfOccuringPartTwo.splice(arrayOfOccuringPartTwo.indexOf(getNext[0]), 1);   
      arrayOfOccuringPartTwo.filter(elem => elem.before.includes(getNext[0].letter))
         .forEach(elem => {
            elem.before.splice(elem.before.indexOf(getNext[0].letter), 1)
         });
      
         
      const timePassed = workers.filter(elem => elem.stepTime > 0)
         .sort((a, b) => b.stepTime > a.stepTime ? -1 : 1);
      result += timePassed[0].stepTime;
      workers.filter(elem => elem.stepTime > 0)
      .map(elem => elem.stepTime -= +timePassed[0].stepTime);
            
      console.log(result);
   }
   console.log(result);
}

partTwo();