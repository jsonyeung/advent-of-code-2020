/*
https://adventofcode.com/2020/day/8
node day_8/part_1.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
  For this problem, if we think of each operation as a node, pointing to another
  operation/node within a directed graph (https://algs4.cs.princeton.edu/42digraph/),
  we can detect a loop when the graph has a directed cycle (aka, a loop).
*/

const ops = input.map((op) => {
  op = op.split(' ')
  op[1] = Number(op[1])
  return op
})

let visited = new Set()
let acc = 0, pointer = 0

while (pointer < ops.length) {
  const [op, val] = ops[pointer]
  let inc = 1

  if (visited.has(pointer)) break

  // apply operation
  switch (op) {
    case 'acc':
      acc += val
      break
    case 'jmp':
      inc = val
      break
  }

  visited.add(pointer)
  pointer += inc
}

// console.log(ops)
console.log(acc)

