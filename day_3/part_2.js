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
 THOUGHT PROCCESS
 ----------------
 Given my reasoning in part 1, we can abstract this
 to apply for any given slopes:
 
 Assuming we have a slope (N RIGHTS, M DOWNS), 
 we should keep track of the tobaggan's position every N step(s)
 while moving down the map M row(s) at a time, checking whether we hit a tree
*/

function getTreeHits(rights, downs) {
  const map = input
  const num_rows = map.length
  const num_cols = map[0].length

  let trees = 0
  let tobaggan_pos = 0

  for (let m = downs; m < map.length; m += downs) {
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




