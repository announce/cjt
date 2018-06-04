'use strict'

const os = require('os')
const _ = require('lodash')
const csvParser = require('javascript-csv')

const convert = function (input) {
  const data = csvParser.toArrays(input)
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

const hasElement = function (row) {
  return !_.every(row, _.isEmpty)
}

const format = function (row, sep) {
  const h = _.join(row, sep)
  return `${sep}${h}${sep}`
}

const formatHeader = function (row) {
  return format(row, '||')
}

const formatBody = function (row) {
  return format(row, '|')
}

exports.convert = convert
