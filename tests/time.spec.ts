// Unit Test
import { getDate } from '../app/utils/time'

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
