// Unit Test
import { getToday } from '../app/utils/time'

describe('getToday', () => {
  it('should return a string in the format YYYY/MM/DD', () => {
    const today = getToday()

    expect(today).toMatch(/\d{4}(?:\/\d{2}){2}/)
  })

  it('should return the current date', () => {
    const today = getToday()

    const dateObject = new Date()
    const month = dateObject.getUTCMonth() + 1 // months from 1-12
    const day = dateObject.getUTCDate()
    const year = dateObject.getUTCFullYear()

    expect(today).toBe(`${year}/${month}/${day}`)
  })
})
