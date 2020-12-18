/*
https://adventofcode.com/2020/day/4
node day_4/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n\r\n')

/*
  We just need to check whether each passport contains 
  all the necessary attributes or not. If it has, then we know it's valid.
  Else, just filter it out.
*/

let passports = input.map((line) => {
  // just return an array of attributes for each passport
  return line.match(/[\\r\\n]?([a-z]{3})(?=:)/g)
})

// PART: filter by # of attributes
const REQUIRED = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
passports = passports.filter((keys) => {
  return REQUIRED.every((p) => keys.includes(p))
})

console.log(passports.length)