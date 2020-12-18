/*
https://adventofcode.com/2020/day/5
node day_5/part_2.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
  In part two, we are finding a seatID that actually doesn't exist within the input.
  HOWEVER, there exists two other seatIDs that have a +1 and -1 difference from ours that ARE in the input.
  (e.g. if "319 && 321" exists, the non-existent 320 is our seatID)
  Given this information, we have to find the missing "gap" which is our seatID

  To make things simple, just sort the seatIDs and loop through, checking for
  the missing gap (see code).
*/

function getSeatRow(partition) {
  const code = partition.slice(0, -3)
  let row_upper = 127,
      row_lower = 0

  for (const char of code.split('')) {
    let half_range = (row_upper - row_lower + 1) / 2
    if (char === 'F') row_upper -= half_range
    else if (char === 'B') row_lower += half_range
  }

  return row_lower
}

function getSeatCol(partition) {
  const code = partition.slice(-3)
  let col_upper = 7,
      col_lower = 0

  for (const char of code.split('')) {
    let half_range = (col_upper - col_lower + 1) / 2
    if (char === 'L') col_upper -= half_range
    else if (char === 'R') col_lower += half_range
  }

  return col_lower
}

function getSeatID(partition) {
  return 8 * getSeatRow(partition) + getSeatCol(partition)
}

// get seatIDs
let seatIDs = input.map(getSeatID)
seatIDs.sort((a, b) => a - b)

for (let i = 1; i < seatIDs.length; i++) {
  const id = seatIDs[i]

  if (seatIDs[i-1] !== id-1) {
    console.log(id-1)
    break
  }
}