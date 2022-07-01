import mainnetAddresses from "./mainnetAddresses"
import barnardAddresses from "./barnardAddresses"

export const tokenImages: { [key: string]: string } = {
  USDN: 'https://raw.githubusercontent.com/wenwenprotocol/tokenlist/master/assets/usdn.svg',
  JPYN: 'https://raw.githubusercontent.com/wenwenprotocol/tokenlist/master/assets/jpyn.svg',
  EURN: 'https://raw.githubusercontent.com/wenwenprotocol/tokenlist/master/assets/eurn.svg',
  SHAREN: 'https://raw.githubusercontent.com/wenwenprotocol/tokenlist/master/assets/share.svg',
}

export interface Asset {
  symbol: string
  poolAddress: string
  tokenAddress: string
  name: string
}

export const assets: { [key: number]: Array<Asset> } = {
  1: mainnetAddresses.assets,
  251: barnardAddresses.assets,
}

export const wen: { [key: number]: string } = {
  1: mainnetAddresses.WEN,
  251: barnardAddresses.WEN,
}

export const share: { [key: number]: string } = {
  1: mainnetAddresses.SHARE,
  251: barnardAddresses.SHARE,
}

export const sShare: { [key: number]: string } = {
  1: mainnetAddresses.SSHARE,
  251: barnardAddresses.SSHARE,
}

export const staking: { [key: number]: string } = {
  1: mainnetAddresses.Staking,
  251: barnardAddresses.Staking,
}

export const farms: { [key: number]: typeof mainnetAddresses.Farms } = {
  1: mainnetAddresses.Farms,
  251: barnardAddresses.Farms,
}

export const swaps: { [key: number]: typeof mainnetAddresses.Swaps } = {
  1: mainnetAddresses.Swaps,
  251: barnardAddresses.Swaps,
}

export const pairs: { [key: number]: typeof mainnetAddresses.Pairs } = {
  1: mainnetAddresses.Pairs,
  251: barnardAddresses.Pairs,
}

export const stcOracle: { [key: number]: string } = {
  1: mainnetAddresses.StcOracle,
  251: barnardAddresses.StcOracle,
}

export const record: { [key: number]: string } = {
  1: mainnetAddresses.Record,
  251: barnardAddresses.Record,
}