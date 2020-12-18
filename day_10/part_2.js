/*
https://adventofcode.com/2020/day/10
node day_10/part_2.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')
              .map(Number)

/*
  This one I got stuck on 😖. Although I was able to figure out
  the general algorithm on my own, I had trouble trying to implement it.

  I found this explanation by Hey Programmers to be super helpful:
  https://www.youtube.com/watch?v=_f8N7qo_5hA
  
  Basically, we can check each number in the sorted list (ascending) if
  its next three numbers have valid differences <= 3. We then recursively check
  the next three numbers of those three numbers until we get to the end of the path (where we're left with 1 valid arrangement), returning 1.
  Finally, we can then add these paths together, giving us the total number of valid arrangements/paths.

  One thing to note is that this will take forever to run given our large input. We will also 
  have to implement a caching system using dynamic programming, saving the # of paths for each number
  in an array; instead of recalling 'getPaths', we can use that cache value if it exists
*/

input.sort((a, b) => a - b)
input.unshift(0)
input.push(input[input.length-1] + 3)

const validDiff = (i, inc) => {
  const diff = (input[i + inc] - input[i])
  return (diff != null && diff <= 3)
}

const cache = []
function getPaths(i=0) {
  if (i === input.length-1) return 1
  let count = 0
  if (validDiff(i, 1)) count += (cache[i+1] || getPaths(i+1))
  if (validDiff(i, 2)) count += (cache[i+2] || getPaths(i+2))
  if (validDiff(i, 3)) count += (cache[i+3] || getPaths(i+3))

  cache[i] = count
  return count
}

console.log(getPaths())