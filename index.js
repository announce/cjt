'use strict'

const fs = require('fs')
const argparse = require('argparse')
const cjt = require('./src/cjt')

const printJt = (err, data) => {
  if (err) throw err
  const jt = cjt.convert(data)
  console.log(jt)
}
const parser = new argparse.ArgumentParser({
  version: process.env.npm_package_version,
  addHelp: true,
  description: process.env.npm_package_description
})
parser.addArgument(
  [ '-f', '--file' ],
  {
    help: 'Specify target file',
    required: true
  }
)
parser.addArgument(
  [ '--encoding' ],
  {
    help: 'Specify encoding to read file',
    argumentDefault: 'utf8'
  }
)
const args = parser.parseArgs()
fs.readFile(
  args.file,
  printJt,
  args.encoding
)
