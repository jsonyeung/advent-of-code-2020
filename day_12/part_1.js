/*
https://adventofcode.com/2020/day/12
node day_12/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
  We need to apply a list of commands, keeping track of the boat's position & direction.
  The only difficult part is figuring out the boat's direction when turning:

  Assuming the boat only turns in 90° increments, given an array of directions (N, E, S, W)
  the precise direction can by found by taking the the current direction's index (e.g. 'E' = 1) + the # of 90° turns (e.g. 3) % 4 (e.g. returns 'N').
  Because we also have to take account of negative turns, we need to add 4 to the result then modulo again so that the 
  index "wraps" around (https://stackoverflow.com/a/3417242 — see code for details).
*/

const DIRS = ['N', 'E', 'S', 'W']

/* boat information */
let dir = 'E'
let pos = { 
  'N': 0, 'E': 0, 
  'S': 0, 'W': 0 
}

const turn = (rot, deg) => {
  dir = DIRS[((DIRS.indexOf(dir) + (deg/90) * ((rot === 'L') ? -1 : 1) % 4) + 4) % 4]
}

for (const op of input) {
  const command = op[0]
  const val = Number(op.slice(1))

  switch (command) {
    case 'F':
      pos[dir] += val
      break
    case 'L':
      turn('L', val)
      break
    case 'R':
      turn('R', val)
      break
    default:
      pos[command] += val
      break
  }
}

// manhattan distance
const { N, E, S, W } = pos
// console.log(pos)
console.log(Math.abs(N-S) + Math.abs(E-W))



