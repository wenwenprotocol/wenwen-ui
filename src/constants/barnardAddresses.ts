const deployAccount = process.env.REACT_APP_DEPLOY_ACCOUNT || '0x88e2677b89841cd4ee7c15535798e1c8'
const starSwap = process.env.REACT_APP_DEPLOY_ACCOUNT || '0x4783d08fb16990bd35d83f3e23bf93b8'
const kikoSwap = '0xa22e6ec11a4d5926704424136f4115ff'

export default {
  Farms: {
    STC_WEN_STARSWAP: `${deployAccount}::STCWENFarmV2`,
    STC_SHARE_STARSWAP: `${deployAccount}::STCSHAREFarmV2`,
    STC_WEN_KIKOSWAP: `${deployAccount}::KikoSTCWENFarm`,
    STC_SHARE_KIKOSWAP: `${deployAccount}::KikoSTCSHAREFarm`,
  },
  Swaps: {
    StarSwap: `${starSwap}`,
    KikoSwap: `${kikoSwap}`,
  },
  Pairs: {
    STC_WEN_STARSWAP: `${starSwap}::TokenSwap::LiquidityToken<0x00000000000000000000000000000001::STC::STC, ${deployAccount}::WEN::WEN>`,
    STC_SHARE_STARSWAP: `${starSwap}::TokenSwap::LiquidityToken<0x00000000000000000000000000000001::STC::STC, ${deployAccount}::SHARE::SHARE>`,
    STC_WEN_KIKOSWAP: `${kikoSwap}::SwapPair::LPToken<0x00000000000000000000000000000001::STC::STC, ${deployAccount}::WEN::WEN>`,
    STC_SHARE_KIKOSWAP: `${kikoSwap}::SwapPair::LPToken<0x00000000000000000000000000000001::STC::STC, ${deployAccount}::SHARE::SHARE>`,
  },
  WEN: `${deployAccount}::WEN::WEN`,
  SHARE: `${deployAccount}::SHARE::SHARE`,
  SSHARE: `${deployAccount}::SSHARE::SSHARE`,
  Staking: `${deployAccount}::SSHARE`,
  StcOracle: `${deployAccount}::StcPoolOracle`,
  Record: `${deployAccount}::Record`,
  assets: [
    { 
      symbol: 'STC',
      name: 'STC V1',
      poolAddress: `${deployAccount}::STCLendingPoolV1`,
      tokenAddress: '0x00000000000000000000000000000001::STC::STC',
    },
    { 
      symbol: 'STC',
      name: 'STC V2',
      poolAddress: `${deployAccount}::STCLendingPoolV2`,
      tokenAddress: '0x00000000000000000000000000000001::STC::STC',
    },
  ],
}
