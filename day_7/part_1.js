/*
https://adventofcode.com/2020/day/7
node day_7/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
  The goal here is figure out how many bags contain at least 1 gold bag.
  To do this, we can check each bag to see if it contains a gold bag.
  Note, some bags contain bags that contain gold bag(s) inside, so this will require some recursive calls to check:

  PSEUDOCODE:

  function hasGoldBag(bag)
    for each sub-bag in bag
      if sub-bag is a gold bag, return true
      if sub-bag is an empty bag, return false
      else check inside sub-bag (aka. hasGoldBag(sub_bag)) and repeat recursively
  
  for each bag:
    if the bag -> hasGoldBag(bag),
      increment count
  
  return the count
*/

const bags = input.reduce((acc, bag) => {
  // format strings to object of bags with array of sub-bags
  const [type, contents] = bag.replace(/bags|bag|\.|[0-9]/gi, '').split(' contain ')
  acc[type.trim()] = contents.split(' , ').map((s) => s.trim())
  return acc
}, {})

function hasGoldBag(bag) {
  switch (bag) {
    case 'shiny gold':
      return true
    case 'no other':
      return false
    default:
      return bags[bag].some(hasGoldBag)
  }
}

let count = 0
for (const contains of Object.values(bags)) {
  if (contains.some(hasGoldBag))
    count++  
}

console.log(count)
