#!/usr/bin/env node
const yaml = require('js-yaml')

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
    let parsed
    try {
      parsed = JSON.parse(input)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
    process.stdout.write(yaml.dump(parsed, {
      indent: 2,
      noArrayIndent: true,
      lineWidth: -1,
      noRefs: true,
      quotingType: "'"
    }))
    process.stdout.write('\n')
  })
