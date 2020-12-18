/*
https://adventofcode.com/2020/day/7
node day_7/part_2.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
  For part 2, we have to figure out the # of bags a gold bag contains.
  In particular, we have to keep track of the sub-bags count, making sure to add the
  # of sub-bags PLUS the # of bags within that sub-bag.
*/

const bags = input.reduce((acc, bag) => {
  // format strings to object of bags with array of sub-bags and their amounts
  const [type, contents] = bag.replace(/bags|bag|\./gi, '').split(' contain ')
  acc[type.trim()] = contents.split(' , ').map((s) => {
    s = s.trim()
    if (s === 'no other') return [s, 0]
    else return [
      s.split(' ').slice(1).join(' '), 
      Number(s.split(' ')[0])
    ]
  })
  return acc
}, {})

function bagCountDive(bag) {
  let count = 0
  for (const [sub_bag, amt] of bags[bag]) {
    if (sub_bag === 'no other') return 0
    else count += amt + (amt * bagCountDive(sub_bag))
  }
  return count
}

console.log(bagCountDive('shiny gold'))



