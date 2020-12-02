/*
https://adventofcode.com/2020/day/2
node day_2/part_2.js
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
  let [p0, p1] = range.split('-').map(Number)

  return {
    p0: pass[p0 - 1], 
    p1: pass[p1 - 1],
    policy: policy[0],
    pass
  }
})
// console.log(input)

// check the number of valid passwords
let valid = 0
for (const el of input) {
  const { p0, p1, policy } = el
  if (p0 === policy && p1 === policy) continue
  if (p0 === policy || p1 === policy) valid++
}

console.log(valid)

