/*
https://adventofcode.com/2020/day/6
node day_6/part_2.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n\r\n')

/*
  For part 2, instead of counting unique characters,
  now we have to take the intersection
  of all the sets of characters for each group
*/

const groups = input.map((str) => {
  return str.split(/\r\n/g)
            .map((str) => str.split(''))
})

let count = 0
for (const group of groups) {
  let join = group[0]

  for (let i = 1; i < group.length; i++) {
    // take the intersection
    join = join.filter((x) => group[i].includes(x))
  }

  count += join.length
}

console.log(count)




