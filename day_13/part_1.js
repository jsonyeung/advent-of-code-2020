/*
https://adventofcode.com/2020/day/13
node day_13/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
*/

const timestamp = Number(input[0])
const busIDs = input[1].match(/[0-9]+/g).map(Number)

let timestamps = busIDs.map((id) => {
  let mult = Math.round(timestamp / id)
  return (id * mult) 
})

let earliest = Math.min(...timestamps.filter((v) => ((v - timestamp) >= 0)))
let busID = busIDs[timestamps.indexOf(earliest)]

// console.log(earliest, busID)
console.log(busID * (earliest - timestamp))