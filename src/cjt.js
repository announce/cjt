'use strict'

const os = require('os')
const _ = require('lodash')
const csvParser = require('javascript-csv')

// https://jira.atlassian.com/secure/WikiRendererHelpAction.jspa?section=all
const ESCAPE = /([|{}])/g

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
  const r1 = _.map(row, _.trim)
  const r2 = _.map(r1, (r) => { return r.replace(ESCAPE, '\\$1') })
  const r3 = _.map(r2, (r) => { return _.isEmpty(r) ? ' ' : r })
  const s = _.join(r3, sep)
  return `${sep}${s}${sep}`
}

const formatHeader = (row) => {
  return format(row, '||')
}

const formatBody = (row) => {
  return format(row, '|')
}

exports.convert = convert
