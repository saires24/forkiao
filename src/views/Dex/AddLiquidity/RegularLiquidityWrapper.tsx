/** @jsxImportSource theme-ui */
import React, { useCallback } from 'react'
import { Flex } from '@ape.swap/uikit'
import { RouteComponentProps } from 'react-router-dom'
import { Currency } from '@ape.swap/sdk'
import { useUserRecentTransactions } from 'state/user/hooks'
import { Field } from 'state/mint/actions'
import { currencyId } from 'utils/currencyId'
import { dexStyles } from '../styles'
import DexNav from '../components/DexNav'
import MyPositions from '../components/MyPositions'
import RecentTransactions from '../components/RecentTransactions'
import LiquiditySelector from './components/LiquiditySelector'
import RegularLiquidity from 'components/DualAddLiquidity/RegularLiquidity'
import { useSwapState } from 'state/swap/hooks'

export enum LiquidityTypes {
  ADD = 'ADD',
  ZAP = 'ZAP',
  MIGRATE = 'MIGRATE',
}

function RegularLiquidityWrapper({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
  const onChangeLiquidityType = useCallback(
    (newLiquidityType: LiquidityTypes) => {
      if (newLiquidityType === LiquidityTypes.ZAP) history.push('/zap')
    },
    [history],
  )

  const [recentTransactions] = useUserRecentTransactions()

  const { INPUT, OUTPUT } = useSwapState()
  // Set either param currency or swap currency
  currencyIdA = currencyIdA || INPUT.currencyId
  currencyIdB = currencyIdB || OUTPUT.currencyId

  const handleCurrenciesURL = useCallback(
    (field: Field, currency: Currency) => {
      const newCurrencyId = currencyId(currency)
      if (field === Field.CURRENCY_A) {
        if (newCurrencyId === currencyIdB) {
          history.push(`/add-liquidity/${currencyIdB}/${currencyIdA}`)
        } else if (currencyIdB) {
          history.push(`/add-liquidity/${newCurrencyId}/${currencyIdB}`)
        } else {
          history.push(`/add-liquidity/${newCurrencyId}`)
        }
      } else if (field === Field.CURRENCY_B) {
        if (newCurrencyId === currencyIdA) {
          if (currencyIdB) {
            history.push(`/add-liquidity/${currencyIdB}/${newCurrencyId}`)
          } else {
            history.push(`/add-liquidity/${newCurrencyId}`)
          }
        } else {
          history.push(`/add-liquidity/${currencyIdA || 'ETH'}/${newCurrencyId}`)
        }
      }
    },
    [currencyIdA, history, currencyIdB],
  )

  return (
    <Flex sx={dexStyles.pageContainer}>
      <Flex sx={{ flexDirection: 'column' }}>
        <Flex sx={dexStyles.dexContainer}>
          <DexNav />
          <MyPositions />
          <LiquiditySelector liquidityType={LiquidityTypes.ADD} onChangeLiquidityType={onChangeLiquidityType} />
          <RegularLiquidity
            currencyIdA={currencyIdA}
            currencyIdB={currencyIdB}
            handleCurrenciesURL={handleCurrenciesURL}
          />
        </Flex>
        {recentTransactions && <RecentTransactions />}
      </Flex>
    </Flex>
  )
}

export default React.memo(RegularLiquidityWrapper)
