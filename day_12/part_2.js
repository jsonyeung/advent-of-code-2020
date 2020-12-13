/*
https://adventofcode.com/2020/day/12
node day_12/part_2.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
  This part is the same except, instead of keeping track of the boat's direction,
  we keep track of a "waypoint" marker that determines the boat's direction and movement.
  Once again, the only difficult part is figuring out the turning.

  Since the position of the waypoint is relative to the position of the boat, it
  can be difficult to know how to rotate each directional component (N, E, S, W).
  One helpful tip is to visualize each component as a single vector that you rotate 90° — that is the direction what you rotate on.

  (e.g. turning 90° to the left, 'E' becomes 'N'
               ^ 
               |
      --->     |
  )
*/

/* waypoint information */
let wp_pos = { 
  'N': 1, 'E': 10, 
  'S': 0, 'W': 0 
}

/* boat information */
let pos = {
  'N': 0, 'E': 0, 
  'S': 0, 'W': 0 
}

const turn = (rot, deg) => {
  const steps = (deg/90)
  
  let temp = {}
  for (let i = 0; i < steps; i++) {
    temp = {...wp_pos}
    wp_pos = (rot === 'L') ? {
      'N': temp['E'],
      'E': temp['S'],
      'W': temp['N'],
      'S': temp['W'],    
    } : {
      'E': temp['N'],
      'S': temp['E'],
      'N': temp['W'],
      'W': temp['S'],    
    }
  }
}

for (const op of input) {
  const command = op[0]
  const val = Number(op.slice(1))

  switch (command) {
    case 'F':
      pos['N'] += (wp_pos['N'] * val)
      pos['E'] += (wp_pos['E'] * val)
      pos['S'] += (wp_pos['S'] * val)
      pos['W'] += (wp_pos['W'] * val)
      break
    case 'L':
      turn('L', val)
      break
    case 'R':
      turn('R', val)
      break
    default:
      wp_pos[command] += val
      break
  }
}

// manhattan distance
const { N, E, S, W } = pos
// console.log(pos)
console.log(Math.abs(N-S) + Math.abs(E-W))



