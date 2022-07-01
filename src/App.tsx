import React, { useCallback, useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import ModalsProvider from './contexts/Modals'
import StarcoinProvider from './contexts/StarcoinProvider'
import TransactionProvider from './contexts/Transaction'
import theme from './theme'
import AssetPools from './views/AssetPools'
import AssetPoolDetail from './views/AssetPoolDetail'
import Dashboard from './views/Dashboard'
import Staking from './views/Staking'
import Pools from './views/Farm'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import WalletPrivider from './contexts/Wallet/WalletProvider'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(
    () => {
      setMobileMenu(false)
    },
    [setMobileMenu]
  )

  const handlePresentMobileMenu = useCallback(
    () => {
      setMobileMenu(true)
    },
    [setMobileMenu]
  )

  return (
    <Providers>
      <Helmet 
        titleTemplate="WENWEN Protocol - %s"
        defaultTitle="WENWEN Protocol - Decentralized Stablecoin That Liberate Your Liquidity"
      />
      <BrowserRouter>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route path="/" exact>
            <AssetPools />
          </Route>
          <Route path="/borrow" exact>
            <Redirect to="/" />
          </Route>
          <Route path="/farm" exact>
            <Pools />
          </Route>
          <Route path="/stake" exact>
            <Staking />
          </Route>
          <Route path="/borrow/:assetName" >
            <AssetPoolDetail />
          </Route>
           <Route path="/dashboard" exact>
            <Dashboard />
          </Route>         
        </Switch>
      </BrowserRouter>
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <WalletPrivider>
          <StarcoinProvider>
            <TransactionProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </TransactionProvider>
          </StarcoinProvider>  
        </WalletPrivider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
