import { isArray, isEmpty, isString, last, toPairs } from 'lodash'

export const removeAllWhiteSpaces = str => {
  return str.replace(/[\r\n\s]/g, '')
}

export const isZhuyin = str => {
  const zhuyin = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/
  return zhuyin.test(str)
}

export const isValidKeywordQueryString = str => {
  const strWithoutWhiteSpace = removeAllWhiteSpaces(str)
  if (isEmpty(strWithoutWhiteSpace))
    return false
  if (isZhuyin(last(strWithoutWhiteSpace)))
    return false
  return true
}

export const showConnectToYoutube = (title, keyword) => {
  const check = window.confirm(`連結至Youtube搜尋 "${title}" `)
  if (check) {
    window.open(`https://www.youtube.com/results?search_query=${keyword}`, '_blank').focus()
  }
}

export const isUrlSearchParamTrue = param => {
  const urlParams = new URLSearchParams(window.location.search)
  if (!urlParams.has(param)) return false
  const value = urlParams.get(param).toUpperCase()
  return isEmptyString(value) || value === 'TRUE'
}

export const getParamsValue = params => {
  const urlParams = new URLSearchParams(window.location.search)
  return params.reduce((acc, param) => (
    { ...acc, [param]: urlParams.get(param) }
  ), {})
}

export const scrollToTop = (isSmooth = false) => {
  window.scrollTo({ top: 0, behavior: isSmooth ? 'smooth' : 'auto' })
}

export const encodeQueryData = (data = {}) => (
  toPairs(data).map(pair => (
    `${encodeURIComponent(pair[0])}=${encodeURIComponent(pair[1])}`
  )).join('&')
)

export const isEmptyString = str => isString(str) && isEmpty(str)

export const isEmptyArray = arr => isArray(arr) && isEmpty(arr)
