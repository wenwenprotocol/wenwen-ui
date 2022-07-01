import { TransactionPayloadVariantScriptFunction } from '@starcoin/starcoin/dist/src/lib/runtime/starcoin_types'
import { arrayify, hexlify } from '@ethersproject/bytes'
import { bcs, utils, onchain_events, encoding } from '@starcoin/starcoin'
import { Provider } from '../contexts/StarcoinProvider/StarcoinProvider'
import { rawToBn } from '.'

export type Address = string

export const serializeU128 = (value: string | number): string => {
  const se = new bcs.BcsSerializer()
  se.serializeU128(BigInt(value))
  return hexlify(se.getBytes())
}

export const serializeVectorU8 = (values: number[]): string => {
  const se = new bcs.BcsSerializer()
  se.serializeLen(values.length)
  values.forEach(val => se.serializeU8(val))
  return hexlify(se.getBytes())
}

export const serializeScriptFunction = (scriptFunction: TransactionPayloadVariantScriptFunction) => {
  const se = new bcs.BcsSerializer()
  scriptFunction.serialize(se)
  return hexlify(se.getBytes())
}

export const getBalance = async (
  provider: Provider, 
  account: Address, 
  tokenAddress?: Address
) => {
  const balance = await provider.getBalance(account, tokenAddress)
  return rawToBn(balance ? balance.toString() : 0)
}

// TODO: Wait for Starcoin update
export const getEvents = async (
  provider: Provider,
  eventName: string,
  fromBlock: number,
  toBlock: number,
) => {
  const eventKey = hexlify(encoding.stringToBytes(eventName))
  const eventKeyInHex = utils.hex.toHexString(arrayify(eventKey))
  const events = await provider.getTransactionEvents({
    event_keys: ['0x12000000000000008437c1a93320588cdad4c47e9adc58de'],
    from_block: 2859384,
    to_block: 2859384,
  })
  console.log(eventKey, eventKeyInHex)
  console.log(onchain_events.decodeEventKey('0x12000000000000008437c1a93320588cdad4c47e9adc58de'))
  console.log({ eventKey, events })
  return events
}
