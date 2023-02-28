// Unit Test
import { getDate, getDateAndTime, getDateTitle } from '../app/utils/time'

describe('getDate', () => {
  it('should return the date in dd/mm/yyyy format', () => {
    const date = new Date(2020, 3, 15) // 15 April 2020
    const expected = '2020/04/15'

    expect(getDate(date)).to.equal(expected)
  })

  it('should return the current date if no argument is passed', () => {
    const expected = new Date().toLocaleDateString().split('/').reverse().join('/')

    expect(getDate()).to.equal(expected)
  })
})

describe('getDateTitle', () => {
  it('should return Today when date is today', () => {
    const today = getDate()
    const result = getDateTitle(today)

    expect(result).toBe('Today')
  })

  it('should return the long date format when date is not today', () => {
    const date = new Date(2020, 5, 15)

    const result = getDateTitle(date.toString())

    expect(result).toBe('June 15, 2020')
  })
})

describe('getDateAndTime', () => {
  it('should return the date and time in the correct format', () => {
    const date = '2020-01-01T12:00:00'
    const expected = 'Wednesday, January 1, 2020 at 12:00 PM'

    expect(getDateAndTime(date)).toEqual(expected)
  })

  it('should throw an error if an invalid date is provided', () => {
    expect(() => getDateAndTime('invalid')).toThrowError()
  })
})
