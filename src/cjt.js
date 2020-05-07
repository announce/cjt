'use strict'

const os = require('os')
const _ = require('lodash')
const csvParser = require('javascript-csv')

// https://jira.atlassian.com/secure/WikiRendererHelpAction.jspa?section=all
const NOTATION_CHARS = /([|{}])/g

/**
 * Parse CSV and normalize column values
 * @param input
 * @returns {string}
 */
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

const format = (row, delimiter) => {
  const str = row.map((columnValue) => {
    const value = columnValue.trim().replace(NOTATION_CHARS, '\\$1')
    return _.isEmpty(value) ? ' ' : value
  }).join(delimiter)
  return `${delimiter}${str}${delimiter}`
}

const formatHeader = (row) => {
  return format(row, '||')
}

const formatBody = (row) => {
  return format(row, '|')
}

exports.convert = convert
