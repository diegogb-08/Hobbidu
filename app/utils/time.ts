/**
 * @param {Date} date Default is new Date unless another date is passed
 * @returns "YYYY/MM/DD"
 */
export const getDate = (date: Date = new Date()) => {
  return date.toLocaleDateString().split('/').reverse().join('/')
}
