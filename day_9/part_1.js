/*
https://adventofcode.com/2020/day/9
node day_9/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')
              .map(Number)

/*
  Given a list of numbers, the first 25 numbers are "preamble".
  For each number after the first 25, they are the sum of any two of their PREVIOUS 25 numbers.

  Here, we can check each number, whether its previous 25 numbers
  contain a pair that sum to it by simply checking using a double for loop (yeah, I know... but it works).
*/
const PREAMBLE_LEN = 25

for (let i = PREAMBLE_LEN; i < input.length; i++) {
  const sum = input[i]
  const preamble = input.slice(i-PREAMBLE_LEN, i)

  // find the pair
  let hasPair = false
  for (let j = 0; j < preamble.length; j++) {
    for (let k = j+1; k < preamble.length; k++) {
      if (preamble[j] + preamble[k] === sum) {
        hasPair = true
        break
      }
    }
  }

  if (!hasPair) {
    console.log(sum)
    break
  }
}
