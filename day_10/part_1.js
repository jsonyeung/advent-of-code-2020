/*
https://adventofcode.com/2020/day/10
node day_10/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')
              .map(Number)

/*
  We need to keep track of the # of differences that are <= 3
  in a sorted array (ascending).

  Here, we can simply run a loop for each number, then add the number of
  differences to an array. We can finally multiply the (# of 1-diffs) by
  the (# of 3-diffs) to get the answer
*/

input.sort((a, b) => a - b)
input.unshift(0)
input.push(input[input.length-1] + 3)

const diffs = [0, 0, 0]
for (let i = 0; i < input.length; i++) {
  const diff = (input[i+1] - input[i])
  if (diff <= 3) diffs[diff-1]++
}

// console.log(input)
console.log(diffs)
console.log(`${diffs[0]} * ${diffs[2]} = ${diffs[0]*diffs[2]}`)
