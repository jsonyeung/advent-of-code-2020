/*
https://adventofcode.com/2020/day/11
node day_11/part_2.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
  There are only two things that changes in part 2:
    - Instead of looking at adjacent seats, we have to look outward in all directions until we see a '#'
    - A '#' changes to 'L' when there are 5 adjacent seats (before it was 4)
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
    let inc = 1

    // keep looking in direction
    while (inBounds(r+dr*inc, c+dc*inc)) {
      const seat = input[r+dr*inc][c+dc*inc]
      if (seat === '#') count++
      if (['L', '#'].includes(seat)) break
      inc++
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
          // change required seats to 5 instead of 4
          if (countAdjacent(r, c) >= 5) {
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