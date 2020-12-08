/*
https://adventofcode.com/2020/day/8
node day_8/part_2.js
*/
const PATH = './input.txt'

const path = require("path")
const fs = require('fs')
let input = fs.readFileSync(path.resolve(__dirname, PATH))
              .toString()
              .split('\r\n')

/*
  Here, we need to figure out which 'nop' or 'jmp' command,
  when swapped with the opposite, teminates successfully (w/o infinite loops).

  Here, I actually got stuck trying to figure out a solution 😅
  so in the end I just brute forced it by swapping & testing every nop & jmp combination
  whether it terminates succesfully
*/

const ops = input.map((op) => {
  op = op.split(' ')
  op[1] = Number(op[1])
  return op
})

function runOps(swap) {
  const [swap_i, swap_op] = swap
  let visited = new Set()
  let acc = 0, pointer = 0

  while (pointer < ops.length) {
    let [op, val] = ops[pointer]
    let inc = 1

    if (visited.has(pointer))
      return [acc, pointer]

    // swap operations if pointer is at test_i
    if (pointer === swap_i)
      op = swap_op

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

  return [acc, pointer]
}

let swap
for (let i = 0; i < ops.length; i++) {
  const op = ops[i][0]

  if (op === 'nop' || op === 'jmp') {
    swap = [i, ((op === 'nop') ? 'jmp' : 'nop')]
    
    const [acc, pointer] = runOps(swap)
    if (pointer >= ops.length) {
      console.log(acc)
      break
    }
  }
}


