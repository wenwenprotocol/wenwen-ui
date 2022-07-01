import BigNumber from 'bignumber.js'
import { i18n as I18n } from 'i18next'

export { default as formatAddress } from './formatAddress'

export const bnToDec = (bn: BigNumber, decimals = 9): number => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

export const decToBn = (dec: number | string, decimals = 9) => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals))
}

/**
 * reduce decimals for raw result from request
 * @param raw raw result from calling contract function
 * @param decimals decimals need to be reduced
 */
export const rawToBn = (raw: number | string, decimals = 9) => {
  return new BigNumber(raw).dividedBy(new BigNumber(10).pow(decimals))
}

export const getDocUrl = (i18n: I18n, slug: string = '') => {
  const lang = i18n.language || 'en'
  const url = 'https://docs.wenwen.money/'
  const baseUrl = lang === 'en' ? url : url + `v/${lang}/`

  return baseUrl + `${slug}`
}

export const isValid = (val: string) => {
  return Boolean(val && new BigNumber(val).gt(0))
}