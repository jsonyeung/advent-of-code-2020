/*
https://adventofcode.com/2020/day/4
node day_4/part_2.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n\r\n')

/*
  compared to part 1, now we have to take account the validity of
  the actual values. So, there are two things we have to check:
  if a passport contains all the necessary attributes (part 1)
  AND all attributes have valid values, then we know it's valid.

  PSEUDOCODE:

  parse input such that we get an array of passports.
    - where each passport should be an OBJECT with attributes and values

  for each passport
    check if passport has all required attributes (part 1)
    check if each passport has valid values
*/

function parsePassport(line) {
  // note: unlike part 1, this time we need to get the values too
  // so return an object instead of an array of attributes
  const r = /[\\r\\n]?([a-z]{3})(?=:([^\s\\]+))/g
  let match = r.exec(line)
  let passport = {}

  while (match != null) {
    passport[match[1]] = match[2]
    match = r.exec(line)
  }
  return passport
}

function passportValid(passport) {
  const { 
    byr, eyr, iyr, 
    pid, hcl, ecl, hgt 
  } = passport

  // check valid height
  const val = hgt.slice(0, -2)
  const unit = hgt.slice(-2)
  if (unit !== 'cm' && unit !== 'in') return false
  if (unit === 'cm' && !(val >= 150 && val <= 193)) return false
  else if (unit === 'in' && !(val >= 59 && val <= 76)) return false

  // check valid everything else
  return (
    (byr >= 1920 && byr <= 2002) &&
    (iyr >= 2010 && iyr <= 2020) &&
    (eyr >= 2020 && eyr <= 2030) &&
    (hcl.startsWith('#') && hcl.length === 7) &&
    (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)) &&
    (pid.length === 9)
  )
}


let passports = input.map(parsePassport)

// PASS 1: filter by # of attributes
const REQUIRED = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
passports = passports.filter((passport) => {
  const keys = Object.keys(passport)
  return REQUIRED.every((p) => keys.includes(p))
})

// PASS 2: filter by valid values
passports = passports.filter(passportValid)

console.log(passports.length)