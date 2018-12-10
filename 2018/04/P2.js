// 04 - Repose Record - Part Two

const fs = require('fs');

const partTwo = () => {
   let inputValues = fs.readFileSync('./input.txt').toString().split(", ");
   
   let inputSorted = [];
   let guardsArray = [];
   
   for (input of inputValues) {
      let newInput = input.replace(/\[|\]|:|-|#|\s+(?=\d)/g, "").split(/ (.*)/);
      inputSorted.push(newInput);
   }
   
   inputSorted.sort(function(a, b) {
      return a[0].localeCompare(b[0]);
   })
   
   let guardTarget = 0;
   let asleepStart = 0;
   
   const existingGuardCheck = (idToCheck) => {
      for (guard of guardsArray) {
         if (guard.guard === idToCheck) {
            return true;
         }
      }
      return false;
   }
   
   const createGuard = (guardId) => {
      guardsArray.push({
         guard: guardId,
         totalAsleep: 0,
         minutes: new Array(60).fill(0)
      });
   }
   
   const writeMinutes = (asleepStart, asleepEnd) => {
      for (let i = asleepStart; i < asleepEnd; i++) {
         guardsArray[guardTarget].minutes[i]++;
      }
   }
   
   for (let input = 0; input < inputSorted.length; input++) {
      let target = inputSorted[input][1].split(" ")[0];
      
      switch(target) {
         case 'Guard':
            let getGuardId = inputSorted[input][1].split(" ")[1];
            if (!existingGuardCheck(getGuardId)) {
               createGuard(getGuardId);
            }
            guardTarget = +guardsArray.findIndex(i => i.guard === getGuardId);
            break;
         case 'falls':
            asleepStart = +inputSorted[input][0].slice(-2);
            break;
         case 'wakes':
            let asleepEnd = +inputSorted[input][0].slice(-2);
            guardsArray[guardTarget].totalAsleep += (asleepEnd - asleepStart);
            writeMinutes(asleepStart, asleepEnd);
      }
   }
   
   // result
   let mostSleepyGuardsMinuteArray = [];
   for (guard of guardsArray) {
      const mostSleepyMinute = guard.minutes.reduce((prev, current) => {
         return (prev > current) ? prev : current;
      })
      mostSleepyGuardsMinuteArray.push(mostSleepyMinute);
   }
   
   const mostSleepyGuardsMinute = mostSleepyGuardsMinuteArray.reduce((prev, current) => {
      return (prev > current) ? prev : current;
   })
   
   const mostSleepyGuardIndex = mostSleepyGuardsMinuteArray.indexOf(mostSleepyGuardsMinute);
   
   console.log(+guardsArray[mostSleepyGuardIndex].guard * +guardsArray[mostSleepyGuardIndex].minutes.indexOf(mostSleepyGuardsMinute));
}

partTwo();