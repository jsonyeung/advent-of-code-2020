/*
https://adventofcode.com/2020/day/2
node day_2/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

// simple formatting
input = input.map((str) => {
  let [range, policy, pass] = str.split(' ')
  let [min, max] = range.split('-').map(Number)

  return {
    min, max,
    policy: policy[0],
    pass
  }
})
// console.log(input)

// check the number of valid passwords
let valid = 0
for (const el of input) {
  let count = el.pass.split('')
    .reduce((acc, char) => {
      return acc + ((char === el.policy) ? 1 : 0)
    }, 0)
  
  if (count >= el.min && count <= el.max)
    valid++
}

console.log(valid)

