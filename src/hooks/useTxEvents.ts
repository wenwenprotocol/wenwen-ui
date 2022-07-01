import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import { getEvents } from '../utils/provider'

const useTxEvents = (eventName: string, fromBlock: number, toBlock: number) => {
  const provider = useStarcoinProvider()

  return useSWR(
    provider ? [eventName, 'fetchTxEvents'] : null,
    async () => {
      try {
        return await getEvents(provider, eventName, fromBlock, toBlock)
      }
      catch (e) {
        console.error('useTxEvents', e)
      }
    }
  )
}

export default useTxEvents