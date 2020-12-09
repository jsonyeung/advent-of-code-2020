/*
https://adventofcode.com/2020/day/9
node day_9/part_2.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')
              .map(Number)

/*
  We have to find a contiguous set (subset of consecutive numbers in list)
  that sum up to the incorrect sum in part 1.

  Given my incorrect sum was 257342611.
  Here, we can create a "sliding window" (https://stackoverflow.com/a/8269948),
  widening/shrinking the window to increase/decrease the sum until we get
  a number that exactly equals the incorrect sum. 

  Then we can sort the window and get the sum of the smallest &
  largest value (our answer)
*/

const targ = 257342611

let start = 0, end = 1
let sum = input[start]

while (sum !== targ) {
  // widen the window
  sum += input[end++]

  // shrink the window
  while (sum > targ)
    sum -= input[start++]
} 

// print sliding window
const window = input.slice(start, end)
                    .sort((a, b) => a - b)
console.log(window)
console.log(`start + end = ${window[0] + window[window.length-1]}`)





