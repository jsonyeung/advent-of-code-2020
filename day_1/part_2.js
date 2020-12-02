/*
https://adventofcode.com/2020/day/1
node day_1/part_2.js
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
let sum = 0, diff = {}
let components = []

while (true) {
  let inp_small = input[small],
      inp_big = input[big]

  sum = inp_small + inp_big

  // if sum >= 2020 then move right pointer down
  if (sum >= 2020) big--

  // if sum < 2020  then move left pointer up
  // and save the target entry to map
  else if (sum < 2020) {
    diff[sum] = [inp_small, inp_big]
    small++
  }

  // if (2020 - small) or (2020 - big) == an entry in map
  const targ_small = diff[2020 - inp_small],
        targ_big = diff[2020 - inp_big]

  if (targ_small) components = [...targ_small, input[small]]
  else if (targ_big) components = [...targ_big, input[big]]
  if (targ_small || targ_big) break
}

const [y1, y2, y3] = components
console.log(`sums [${y1} + ${y2} + ${y3}] = 2020`)
console.log(`product = (${y1} * ${y2} * ${y3}) = ${y1*y2*y3}`)