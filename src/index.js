'use strict'

const maxDays = [31,29,31,30,31,30,31,31,30,31,30,31]
const MIN_YEAR = 1900
const MAX_YEAR = 2010

/**
 * Validates and parse the dates into an object containing integers for { day, month, year }
 * Returns false if the input does not pass the validation rules.
 *
 * @param inputValue
 * @returns {*}
 */
const validateAndParseInput = (inputValue) => {
	let dateReg = /([0-3][0-9])\W([0-1][0-9])\W([1-2][0,1,9][0-9][0-9])/g
	let matches = dateReg.exec(inputValue)
	if (!matches || matches.length !== 4) {
		return false
	}

	let day = parseInt(matches[1])
	let month = parseInt(matches[2])
	let year = parseInt(matches[3])

	if (month > 12) {
		return false
	}

	if (day > maxDays[month]) {
		return false
	}

	if (year < MIN_YEAR || year > MAX_YEAR) {
		return false
	}

	if (!isLeapYear(year) && month == 2 && day > 28 ) {
		return false
	}

	return {
		day, month, year
	}
}

/**
 * Calculates the number of years between MIN_YEAR and the input year.
 *
 * @param year
 * @returns {number}
 */
const countLeapYears = (year) => {
	let counter = 0
	for (let y = MIN_YEAR; y <= year; y++) {
		if (isLeapYear(y)) {
			counter++
		}
	}
	return counter
}

/**
 * Returns true if the year is a leap year.
 *
 * @param year
 * @returns {boolean}
 */
const isLeapYear = (year) => {
	return year % 4 === 0 &&  ( year % 100 !== 0 || year % 400 === 0)
}


/**
 * Works out the number of days from 01/01/MIN_YEAR
 *
 * @param year
 * @param month
 * @param day
 * @returns {*}
 */
const calculateDayNumber = (year, month, day) => {

	//past years
	let numberOfLeapYears =  countLeapYears(year - 1)
	let numberOfNonLeapYears = year - MIN_YEAR - numberOfLeapYears

	//this year's months
	let monthDays = 0
	for (let m = 0; m < month - 1; m++) {
		monthDays += maxDays[m]
	}

	let result = day + monthDays + numberOfLeapYears * 366 + numberOfNonLeapYears * 365 - 1

	//adjust for leap year
	if (!isLeapYear(year) && month > 2) {
		result = result - 1
	}
	return result
}

/**
 * Performs the date diff calulations
 *
 * @param input1
 * @param input2
 * @returns {string}
 */
const calculate = (value) => {
	let result = 'Invalid Input'
	let dates = value.split(',')

	if (dates.length === 2) {
		let input1 = dates[0].trim()
		let input2 = dates[1].trim()

		let parsedInput1 =  validateAndParseInput(input1)
		let parsedInput2 =  validateAndParseInput(input2)

		if (parsedInput1 && parsedInput2) {
			let jdn1 = calculateDayNumber(parsedInput1.year,parsedInput1.month,parsedInput1.day)
			let jdn2 = calculateDayNumber(parsedInput2.year,parsedInput2.month,parsedInput2.day)

			let diff = Math.abs(jdn1 - jdn2)
			if (jdn1 > jdn2) {
				result = `${input2}, ${input1}, ${diff}`
			} else {
				result = `${input1}, ${input2}, ${diff}`
			}
		}
	}
	return result

}

module.exports = {
	calculate,
	calculateDayNumber,
	isLeapYear,
	countLeapYears,
	validateAndParseInput
}