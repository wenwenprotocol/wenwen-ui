import { useState } from 'react'

const useTokenInput = (): {
  val: string
  maxVal: string
  setVal: React.Dispatch<React.SetStateAction<string>>
  setMaxVal: React.Dispatch<React.SetStateAction<string>>
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void
  handleSelectMax: () => void
} => {

  const [val, setVal] = useState('')
  const [maxVal, setMaxVal] = useState('0')

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      setVal(e.currentTarget.value)
    }
  }

  const handleSelectMax = () => {
    setVal(maxVal)
  }

  return { 
    val,
    maxVal,
    setVal,
    setMaxVal,
    handleInputChange, 
    handleSelectMax,
  }
}

export default useTokenInput
