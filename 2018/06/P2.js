// 06 - Chronal Coordinates- Part Two

const fs = require('fs');

let coords = [];
let xmin = 0;
let xmax = 0;
let ymin = 0;
let ymax = 0;
let gridX = 0;
let gridY = 0;

const gridSize = () => {
   let inputValues = fs.readFileSync('./input.txt').toString().split("\n");
   for (let i = 0; i < inputValues.length; i++) {
      coords.push( inputValues[i].split(", ") );
   }
   
   xmin = +coords[0][0];
   xmax = +coords[0][0];
   ymin = +coords[0][1];
   ymax = +coords[0][1];
   
   for (let i = 1; i < coords.length; i++) {
      coords[i][0] > xmax ? xmax = +coords[i][0] : coords[i][0] < xmin ? xmin = +coords[i][0] : null;
      coords[i][1] > ymax ? ymax = +coords[i][1] : coords[i][1] < ymin ? ymin = +coords[i][1] : null;
   }
   gridX = xmax - xmin + 1;
   gridY = ymax - ymin + 1;
}

const partTwo = () => {
   gridSize();
   let grid = new Array(gridY).fill(null).map(() => new Array(gridX).fill(0));
   let result = 0;
   
   for (let i = 0; i < coords.length; i++) {
      grid[coords[i][1] - ymin][coords[i][0] - xmin] = i + 1;
   }
   
   const maxDist = 10000;
   
   for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
         
         let checkMaxDist = 0;
         
         for (let k = 0; k < coords.length; k++) {
            let getValue = Math.abs(coords[k][1] - ymin - i) + Math.abs(coords[k][0] - xmin - j);
            checkMaxDist += getValue;
         }
         
         if (checkMaxDist < maxDist) {
            result++;
         } 
      }
   }
   
   console.log(result);
}

partTwo();