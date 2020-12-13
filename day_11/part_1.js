/*
https://adventofcode.com/2020/day/11
node day_11/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
  Part 1 is relatively straight forward.
  For each tile, apply the following rules:
    - If tile is 'L' and no adjacent seats are '#', set seat to '#'
    - If tile is '#' and 4+ adjacent seats are '#', set seat to 'L'
    - If tile is '.' do nothing
  
  Repeat until the map does not change tiles,
  then count the number of '#'s in the map.
*/

const DIRS = [
  [-1, +0], [+1, +0], // up, down
  [+0, -1], [+0, +1], // left, right
  [-1, -1], [+1, +1], // left diag
  [-1, +1], [+1, -1]  // right diag
]

/* helpers */
const inBounds = (r, c) => (
  (r >= 0 && r < input.length) &&
  (c >= 0 && c < input[0].length)
)

const countAdjacent = (r, c) => {
  let count = 0
  for (const [dr, dc] of DIRS) {
    if (inBounds(r+dr, c+dc) && 
        input[r+dr][c+dc] === '#') {
      count++
    }
  }
  return count
}

/* main */
let map = []
let changed = true
let occupied = 0

while (changed) {
  map = []
  changed = false
  occupied = 0

  // for each row
  for (let r = 0; r < input.length; r++) {
    let row = ''

    // for each column
    for (let c = 0; c < input[r].length; c++) {
      const seat = input[r][c]

      // adjust current seat 
      switch (seat) {
        case 'L':
          if (countAdjacent(r, c) <= 0) {
            changed = true
            row += '#'
            occupied++
          } else row += 'L'
          break

        case '#':
          if (countAdjacent(r, c) >= 4) {
            changed = true
            row += 'L'
          } else {
            row += '#'
            occupied++
          }
          break

        default:
          row += '.'
          break
      }
    }

    map.push(row)
  }

  input = map
}

// console.log(input)
console.log(occupied)