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
  For each group, we need to find the number of 
  unique characters; here, we can just use a set.

  PSEUDOCODE:

  count = 0
  for each group
    initiate set, S
    for each question, 
      put in set S

    count += set's size
  
  return count
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


