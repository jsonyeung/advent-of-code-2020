/*
https://adventofcode.com/2020/day/3
node day_3/part_2.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
 Given my reasoning in part 1, we can just abstract
 this to apply for any given slopes (see code).
*/

const map = input
const num_rows = map.length
const num_cols = map[0].length

function getTreeHits(rights, downs) {
  let trees = 0
  let tobaggan_pos = 0

  for (let m = downs; m < num_rows; m += downs) {
    tobaggan_pos = (tobaggan_pos + rights) % num_cols

    if (map[m].charAt(tobaggan_pos) === '#')
      trees++
  }

  return trees
}

console.log(
  getTreeHits(1, 1) *
  getTreeHits(3, 1) *
  getTreeHits(5, 1) *
  getTreeHits(7, 1) *
  getTreeHits(1, 2)
)




