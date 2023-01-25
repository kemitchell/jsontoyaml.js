#!/usr/bin/env node
const yaml = require('js-yaml')
function load (buffer) {
  return yaml.load(buffer, { schema: yaml.JSON_SCHEMA })
}

let inputStream

const argument = process.argv[2]
if (argument) {
  inputStream = require('fs').createReadStream(argument)
} else {
  inputStream = process.stdin
}

const chunks = []
inputStream
  .on('data', chunk => { chunks.push(chunk) })
  .once('error', error => {
    console.error(error)
    process.exit(1)
  })
  .once('end', () => {
    const input = Buffer.concat(chunks)
    process.stdout.write(JSON.stringify(load(input), null, 2))
    process.stdout.write('\n')
  })
