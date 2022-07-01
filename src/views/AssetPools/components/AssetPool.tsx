import React from 'react'
import styled from 'styled-components'
import Pool from '../../../components/Pool'
import Coins from '../../../components/Coins'
import Tooltip from '../../../components/Tooltip'
import useAssetPoolInfo from '../../../hooks/useAssetPoolInfo'
import useBorrowInfo from '../../../hooks/useBorrowInfo'
import useCollateralInfo from '../../../hooks/useCollateralInfo'
import { useTranslation } from 'react-i18next'

interface AssetPoolProps {
  symbol: string
  poolAddress: string
  name: string
}

const AssetPool: React.FC<AssetPoolProps> = ({ symbol, poolAddress, name }) => {
  const { t } = useTranslation()
  const { data: poolInfo } = useAssetPoolInfo(poolAddress)
  const { data: borrowInfo } = useBorrowInfo(poolAddress)
  const { data: collatInfo } = useCollateralInfo(poolAddress)

  const items = [
    { label: '', 
      value: 
      <PoolAsset>
        <Coins coins={[symbol]} />
        <PoolAssetInfo>
          <AssetName>{name}</AssetName>
          {poolInfo && poolInfo.deprecated ? 
            <Tooltip tip={t('borrow.deprecated_tip')} placement='right'>
              <DeprecatedLabel>{t('borrow.deprecated')}</DeprecatedLabel>
            </Tooltip> : null}
        </PoolAssetInfo>
      </PoolAsset> 
    },
    { label: t('borrow.tvl'), value: collatInfo && `$${collatInfo.collatVal.toFormat(0)}` },
    { label: t('borrow.total_borrowed'), value: borrowInfo && `${borrowInfo.borrowed.toFormat(0)}` },
    { label: t('borrow.left_to_borrow'), value: borrowInfo && `${borrowInfo.leftToBorrow.toFormat(0)}` },
    { label: t('borrow.interest_rate'), value: poolInfo && `${poolInfo.interestRate.times(100).toString()}%` },
    { label: t('borrow.liquidation_fee'), value: poolInfo && `${poolInfo.liqMultiplier.minus(1).times(100).toString()}%` },
  ]

  return (
    <Pool items={items} />
  )
}

const PoolAsset = styled.div`
  display: flex;
  align-items: center;
`

const PoolAssetInfo = styled.div`
  display: flex;
  align-items: center;
`

const AssetName = styled.div`
  margin-right: 10px;
`

const DeprecatedLabel = styled.div`
  display: flex;
  font-family: 'Roboto', 'Noto Sans', sans-serif;
  padding: 5px 7px;
  font-size: 12px;
  align-items: center;
  color: #EF4444;
  background-color: rgba(239, 68, 68, 0.1);
  border: solid 1px rgba(239, 68, 68, 0.2);
`

export default AssetPool