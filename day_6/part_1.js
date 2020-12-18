/*
https://adventofcode.com/2020/day/6
node day_6/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n\r\n')

/*
  We need to find the number of 
  unique characters for each group; 
  here, we can just use a set.
*/

const groups = input.map((str) => {
  return str.replace(/\r\n/g, '')
})

let count = 0
for (const group of groups) {
  const set = new Set(group.split(''))
  count += set.size
}

console.log(count)


