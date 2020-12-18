/*
https://adventofcode.com/2020/day/3
node day_3/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
 the tobaggan goes towards a slope of (3 RIGHTS, 1 DOWN)
 so as a result, we should keep track of the tobaggan's position every 3 steps
 while moving down the map 1 row at a time, checking whether we hit a tree. 
 If we hit the end of the map, we simply wrap around to the beginning by moduloing the # of columns.
*/

const map = input
const num_rows = map.length
const num_cols = map[0].length

let trees = 0
let tobaggan_pos = 0

for (let m = 1; m < num_rows; m += 1) {
  tobaggan_pos = (tobaggan_pos + 3) % num_cols

  if (map[m].charAt(tobaggan_pos) === '#')
    trees++
}

console.log(trees)


