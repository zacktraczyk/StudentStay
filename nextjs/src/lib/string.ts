/**
 * @description This function takes in a list of classes and returns a string of classes
 * @param {string[]} classes
 * @returns {string}
 */
export function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

/**
 * @description This function takes in a string and returns a truncated string
 * @param {string} str
 * @param {number} n
 * @param {boolean} useWordBoundary
 * @returns {string}
 */
export function truncate(str: string, n: number, useWordBoundary: boolean) {
  if (str.length <= n) {
    return str
  }
  const subString = str.slice(0, n - 1) // the original check
  return (useWordBoundary ? subString.slice(0, subString.lastIndexOf(' ')) : subString) + '...'
}
