// 06 - Chronal Coordinates - Part One

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

const partOne = () => {
   gridSize();
   let grid = new Array(gridY).fill(null).map(() => new Array(gridX).fill(0));
   let result = new Array(coords.length).fill(0);
   
   for (let i = 0; i < coords.length; i++) {
      grid[coords[i][1] - ymin][coords[i][0] - xmin] = i + 1;
   }
   
   for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
         let coordsOccupying = [];
   
         coordsOccupying.push({ coord: 1, value: Math.abs(coords[0][1] - ymin - i) + Math.abs(coords[0][0] - xmin - j) });
         
         for (let k = 1; k < coords.length; k++) {
            let getValue = Math.abs(coords[k][1] - ymin - i) + Math.abs(coords[k][0] - xmin - j)
            
            if (getValue == coordsOccupying[0].value) {
               coordsOccupying.push({ coord: k + 1, value: getValue });
            } else if (getValue < coordsOccupying[0].value) {
               coordsOccupying = [];
               coordsOccupying.push({ coord: k + 1, value: getValue });
            }
         }
         
         if (coordsOccupying.length > 1) {
            grid[i][j] = "0";
         } else {
            grid[i][j] = coordsOccupying[0].coord;
            result[coordsOccupying[0].coord - 1]++;
         }
      }
   }
   
   for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
         if (i == 0 || i == grid.length - 1) {
            result[grid[i][j] - 1] = 0;
         } else if ((i != 0 || i != grid.length - 1) && (j == 0 || j == grid[i].length - 1)) {
            result[grid[i][j] - 1] = 0;
         }
      }
   }
   
   const partOneResult = (result) => {
      return Math.max.apply(null, result);
   }
   
   console.log(partOneResult(result));
}

partOne();