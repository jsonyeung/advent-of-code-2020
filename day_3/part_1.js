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
 while moving down the map 1 row at a time, checking whether we hit a tree:

 PSEUDOCODE:

 start with tobaggan's pos at 0

 for rows from m = 1 to bottom row
  ⚠ we modulo the position because the map wraps around at the end
  tobaggan's pos = (tobbagan's pos + 3) % (# of columns)

  is (rows[m].charAt(tobbagan's pos) == '#')? (aka, is 🎄?)
    if it is, increment tree count

 return tree count
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


