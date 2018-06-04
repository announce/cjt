'use strict'

const os = require('os')
const _ = require('lodash')
const csvParser = require('javascript-csv')

const convert = (input) => {
  const data = csvParser.toArrays(_.trim(input))
  if (data.length < 1) {
    return ''
  }
  const headerIndex = _.findIndex(data, hasElement)
  if (headerIndex === -1) {
    return ''
  }
  const header = formatHeader(data[headerIndex])
  const body = _.join(
    _.map(_.slice(data, headerIndex + 1), formatBody),
    os.EOL
  )
  return `${header}${os.EOL}${body}`
}

const hasElement = (row) => {
  return !_.every(row, _.isEmpty)
}

const format = (row, sep) => {
  const h = _.join(row, sep)
  return `${sep}${h}${sep}`
}

const formatHeader = (row) => {
  return format(row, '||')
}

const formatBody = (row) => {
  return format(row, '|')
}

exports.convert = convert
