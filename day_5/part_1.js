/*
https://adventofcode.com/2020/day/5
node day_5/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
  Given that we have 128 rows, we have to half the
  number of rows 7 times, depending if it's 'F' or 'B'

  then, we do the same with the 8 seats, where we have to half
  the number of seats 3 times, depending if it's 'L' or 'R'

  PSEUDOCODE:

  for each partition code:

    row_upper = 127
    row_lower = 0
    for the first 7 characters, char
      half_range = (row_upper - row_lower + 1) / 2

      if char is 'F' then: 
        row_upper -= half_range
      else if char is 'B' then:
        row_lower += half_range

    return row_lower (or row_upper, doesn't matter)

    col_upper = 7
    col_lower = 0
    for the last 3 characters, char
      half_range = (row_upper - row_lower + 1) / 2

      if char is 'L' then: 
        col_upper -= half_range
      else if char is 'R' then:
        col_lower += half_range
    
    return col_lower (or col_upper, doesn't matter)
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

console.log(Math.max(...seatIDs))


