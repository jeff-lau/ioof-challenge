let dateDiff = require('./index.js')

describe('ioof-challenge', () => {
	describe('validateAndParseInput', () => {
		it('should return true for valid input', () => {
			expect(dateDiff.validateAndParseInput('01 01 1900')).toEqual({
				day: 1,
				month: 1,
				year: 1900
			})

			expect(dateDiff.validateAndParseInput('31 12 2010')).toEqual({
				day: 31,
				month: 12,
				year: 2010
			})

			expect(dateDiff.validateAndParseInput('29 02 2008')).toEqual({
				day: 29,
				month: 2,
				year: 2008
			})
		})

		it('should return false for invalid formats', () => {
			expect(dateDiff.validateAndParseInput('0101 1900')).toBe(false)
			expect(dateDiff.validateAndParseInput('0101 123 1900')).toBe(false)
			expect(dateDiff.validateAndParseInput('01011900')).toBe(false)
		})

		it('should return false for invalid YEAR value', () => {
			expect(dateDiff.validateAndParseInput('01 01 1899')).toBe(false)
			expect(dateDiff.validateAndParseInput('01 01 2101')).toBe(false)
			expect(dateDiff.validateAndParseInput('01 01 2101')).toBe(false)
			expect(dateDiff.validateAndParseInput('01 01 A')).toBe(false)
		})

		it('should return false for invalid MONTH value', () => {
			expect(dateDiff.validateAndParseInput('01 13 1900')).toBe(false)
			expect(dateDiff.validateAndParseInput('01 -2 1900')).toBe(false)
			expect(dateDiff.validateAndParseInput('01 2 1900')).toBe(false)
			expect(dateDiff.validateAndParseInput('01 A 1900')).toBe(false)
		})

		it('should return false for invalid DAY value', () => {
			expect(dateDiff.validateAndParseInput('-1 01 1900')).toBe(false)
			expect(dateDiff.validateAndParseInput('A 01 1900')).toBe(false)
			expect(dateDiff.validateAndParseInput('33 01 1900')).toBe(false)
			expect(dateDiff.validateAndParseInput('3 01 1900')).toBe(false)
		})

		it('should return false for invalid leap month', () => {
			expect(dateDiff.validateAndParseInput('29 02 2007')).toBe(false)
		})

	})

	describe('isLeapYear', () => {

		it('should return true if its a leap year', () => {
			expect(dateDiff.isLeapYear(2008)).toBe(true)
		})

		it('should return false if its not a leap year', () => {
			expect(dateDiff.isLeapYear(1900)).toBe(false)
			expect(dateDiff.isLeapYear(2007)).toBe(false)
		})

	})

	describe('countLeapYears', () => {
		it ('should count every year that isLeapYear returns true for', () => {
			expect(dateDiff.countLeapYears(2010)).toEqual(27)
		})

		it ('should count every year that isLeapYear returns true for', () => {
			expect(dateDiff.countLeapYears(1900)).toEqual(0)
		})
	})

	describe('calculateDayNumber', () => {
		it('should work out the correct number of days for boundary dates', () => {
			expect(dateDiff.calculateDayNumber(1900,1,1)).toEqual(0)
			expect(dateDiff.calculateDayNumber(1900,1,2)).toEqual(1)
			expect(dateDiff.calculateDayNumber(2010,12,31)).toEqual(40541)
		})

		it('should workout the correct number of days of a leap year', () => {
			expect(dateDiff.calculateDayNumber(2008,2,29)).toEqual(39505)
		})
	})

	describe('calculate', () => {
		it ('should reject inputs without comma', () => {
			expect(dateDiff.calculate('01 01 1910 01 01 2010')).toEqual('Invalid Input')
		})

		it ('should correctly arrange dates with the earliest one first', () => {
			expect(dateDiff.calculate('01 01 1910, 01 01 2010')).toEqual('01 01 1910, 01 01 2010, 36525')
			expect(dateDiff.calculate('01 01 2010, 01 01 1910')).toEqual('01 01 1910, 01 01 2010, 36525')
		})

		it ('should handle inputs with preceding and trailing spaces ', () => {
			expect(dateDiff.calculate('  01 01 1910  ,   01 01 2010')).toEqual('01 01 1910, 01 01 2010, 36525')
		})
	})

})