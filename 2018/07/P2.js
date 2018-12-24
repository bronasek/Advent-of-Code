// 07 - The Sum of Its Parts - Part Two

const fs = require('fs');

const partTwo = () => {
   let inputValues = fs.readFileSync('./input.txt').toString().split("\n")
      .map(elem => elem.match(/ [A-Z] /g).map(elem => elem.trim()));
   
   const letters = [].concat(...inputValues).filter((e, i, a) => i == a.indexOf(e));

   let arrayOfOccuring = [];
   let result = 0;

   for (let i = 0; i < letters.length; i++) {
      arrayOfOccuring.push({ letter: letters[i], before: inputValues
         .filter(elem => elem[1] == letters[i])
         .map(elem => elem[0])
      });
   }
   
   const workers = [
      { worker: 0, stepTime: 0, stepName: "" },
      { worker: 1, stepTime: 0, stepName: "" },
      { worker: 2, stepTime: 0, stepName: "" },
      { worker: 3, stepTime: 0, stepName: "" },
      { worker: 4, stepTime: 0, stepName: "" }
   ];
   
   while(arrayOfOccuring.length) {
      const getProcessedSteps = workers.filter(elem => elem.stepName.length).map(elem => elem.stepName).join("");
      const getPossibleSteps = arrayOfOccuring.filter(elem => !elem.before.length)
         .sort((a, b) => b.letter > a.letter ? -1 : 1);
      const getNewStepsForWorkers = getPossibleSteps.filter(elem => !getProcessedSteps.includes(elem.letter));
         
      for (let i = 0; i < getNewStepsForWorkers.length; i++) {
         const getWorker = workers.filter(elem => elem.stepTime == 0)
            .sort((a, b) => b.worker > a.worker ? -1 : 1)[0];
         if (getWorker) {
            workers[getWorker.worker].stepTime += getNewStepsForWorkers[i].letter.charCodeAt(0) - 4;
            workers[getWorker.worker].stepName = getNewStepsForWorkers[i].letter;
         }
      } 
      
      const getStep = workers.filter(elem => elem.stepTime)
         .sort((a, b) => b.stepTime > a.stepTime ? -1 : 1)[0];
      const timePassed = getStep.stepTime;
      result += timePassed;
      workers.filter(elem => elem.stepTime > 0)
         .map(elem => elem.stepTime -= timePassed); 
        
      arrayOfOccuring.splice(arrayOfOccuring.indexOf(getPossibleSteps.filter(elem => elem.letter === getStep.stepName)[0]), 1); 
      arrayOfOccuring.filter(elem => elem.before.includes(getStep.stepName))
      .map(elem => {
         elem.before.splice(elem.before.indexOf(getStep.stepName), 1)
      });
   }
   
   console.log(result);
}

partTwo();