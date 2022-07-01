import { useContext } from 'react'
import { Context } from '../contexts/StarcoinProvider'

const useStarcoinProvider = () => {
  const { provider } = useContext(Context)
  return provider
}

export default useStarcoinProvider
