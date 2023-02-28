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
  const parsedDate = CoercedDate.parse(date)
  if (today === date) {
    return 'Today'
  } else {
    return new Date(parsedDate).toLocaleDateString('en', { dateStyle: 'long' })
  }
}

export const getDateAndTime = (date: string) => {
  return new Intl.DateTimeFormat('en', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(date))
}
