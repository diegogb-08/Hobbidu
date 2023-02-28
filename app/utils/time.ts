import { CoercedDate } from '~/types/types'

/**
 * @param {Date} date Default is new Date unless another date is passed
 * @returns "YYYY/MM/DD"
 */
export const getDate = (date: Date = new Date()) => {
  return date.toLocaleDateString().split('/').reverse().join('/')
}

export const getDateTitle = (date: string) => {
  const today = getDate()
  const parsedDate = getDate(CoercedDate.parse(date))
  if (today === parsedDate) {
    return 'Today'
  } else {
    return new Date(parsedDate).toLocaleDateString('en', { dateStyle: 'long' })
  }
}
