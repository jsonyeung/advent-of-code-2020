/*
https://adventofcode.com/2020/day/13
node day_13/part_2.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
  yeah, is another one I struggled with. Good thing there was another
  super useful video by Hey Programmers (https://youtu.be/YJRkNHIir_I) 😄  

  Turns out, solving this problem requires you to figure out the 
  least common multiple (LCM) between all numbers. Because the bus IDs given
  are all prime, we can take advantage of the fact that multiplying all prime numbers (and only prime numbers)
  will produce the LCM (https://socratic.org/questions/555eca5e581e2a23d8bb18e2#146749).

  So to find the timestamp, we'll need to find the LCM by multiplying all the IDs. However,
  because each ID has an offset (represented by the x's), we actually have to check
  whether the (timestamp + each number's offset) is divisible by all the prime numbers. (see code)
*/

let busIDs = input[1].split(',')

// get offsets
busIDs = busIDs.map((ID, i) => {
  if (!!!Number(ID)) return ID
  else return [Number(ID), i]
}).filter((v) => v !== 'x')

let timestamp = 0
let step_count = busIDs[0][0]
for (const [ID, offset] of busIDs.slice(1)) {
  // move timestamp up by LCM step counter until
  // (timestamp + offset) is divisible by the current ID
  while ((timestamp + offset) % ID !== 0)
    timestamp += step_count

  // set the LCM step multiple
  // note: this assumes all IDs are prime
  step_count *= ID
}

console.log(timestamp)

