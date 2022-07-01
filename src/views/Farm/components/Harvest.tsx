import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'react-i18next'

import Button from '../../../components/Button'
import Value from '../../../components/Value'
import useReward from '../../../hooks/useReward'
import useTxModal from '../../../hooks/useTxModal'
import TransactionModal from '../../../components/TransactionModal'

interface HarvestProps {
  poolAddress: string
  earnings: BigNumber
}

const Harvest: React.FC<HarvestProps> = ({ poolAddress, earnings }) => {
  const { onReward } = useReward(poolAddress)
  const [txStatus, harvest] = useTxModal(onReward, <TransactionModal />)
  const { t } = useTranslation()

  return (
    <StyledMod>
      <StyledModBd>
        <StyledDesc>{t('farm.earned')}</StyledDesc>
        <StyledValue>
          <Value value={earnings ? earnings.toNumber() : 0} />
        </StyledValue>
      </StyledModBd>
      <StyledModFt>
        <Button
          disabled={ !earnings || !earnings.toNumber() || txStatus === 'pending'}
          text={txStatus === 'pending' ? t('farm.collecting') : t('farm.harvest')}
          onClick={harvest}
        />
      </StyledModFt>
    </StyledMod>
  )
}

const StyledMod = styled.div``

const StyledModBd = styled.div``

const StyledDesc = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #A8B0C1;
  margin-bottom: 10px;
`

const StyledValue = styled.div`
  margin-top: 20px;
`

const StyledModFt = styled.div`
  margin-top: 20px;
`

export default Harvest
