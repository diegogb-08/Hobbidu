// Unit Test
import { getDate, getDateTitle } from '../app/utils/time'

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
    const date = new Date()

    const result = getDateTitle(date.toString())

    expect(result).toBe('Today')
  })

  it('should return the long date format when date is not today', () => {
    const date = new Date(2020, 5, 15)

    const result = getDateTitle(date.toString())

    expect(result).toBe('June 15, 2020')
  })
})
