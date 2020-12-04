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
  here, we just need to check whether a passport contains 
  all the necessary attributes or not. If it has, then we know it's valid:

  PSEUDOCODE:

  parse input such that we get an array of passports.
  - each passport should be an array with its attributes

  for each passport in array
    check if passport has all required attributes
      - that is, check if every required attrs are in the array
        if no, remove the invalid passport from list

  return number of valid passports      
*/

let passports = input.map((line) => {
  // just return an array of attributes for each passport
  return line.match(/[\\r\\n]?([a-z]{3})(?=:)/g)
})

// PASS: filter by # of attributes
const REQUIRED = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
passports = passports.filter((keys) => {
  return REQUIRED.every((p) => keys.includes(p))
})

console.log(passports.length)