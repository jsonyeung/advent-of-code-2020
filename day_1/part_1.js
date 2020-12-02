/*
https://adventofcode.com/2020/day/1
node day_1/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')
              .map(Number)

// sort the input (acsending)
input.sort((a, b) => a - b)

// have two pointers at both ends of array
let small = 0, big = (input.length - 1)
let sum = 0

do {
  let sum = input[small] + input[big]

  // if sum > 2020 then move right pointer down
  if (sum > 2020) big--

  // if sum < 2020 then move left pointer up
  else if (sum < 2020) small++

  // if sum == 2020 then return product of 2 pointers  
} while (sum !== 2020)

small = input[small]
big = input[big]
console.log(`sums [${small} + ${big}] = 2020`)
console.log(`product = (${small} * ${big}) = ${small*big}`)