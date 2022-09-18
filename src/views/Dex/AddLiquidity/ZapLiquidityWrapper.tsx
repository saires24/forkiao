/** @jsxImportSource theme-ui */
import React, { useCallback, useEffect } from 'react'
import { Flex } from '@ape.swap/uikit'
import { RouteComponentProps } from 'react-router-dom'
import { useUserRecentTransactions } from 'state/user/hooks'
import { Field } from 'state/zap/actions'
import { dexStyles } from '../styles'
import DexNav from '../components/DexNav'
import MyPositions from '../components/MyPositions'
import RecentTransactions from '../components/RecentTransactions'
import LiquiditySelector from './components/LiquiditySelector'
import ZapLiquidity from 'components/DualAddLiquidity/ZapLiquidity'
import { useZapActionHandlers, useZapState } from 'state/zap/hooks'
import { ParsedFarm } from 'state/zap/reducer'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '@ape.swap/sdk'

export enum LiquidityTypes {
  ADD = 'ADD',
  ZAP = 'ZAP',
  MIGRATE = 'MIGRATE',
}

const emptyOutput: ParsedFarm = {
  lpSymbol: '',
  lpAddress: '',
  currency1: '',
  currency1Symbol: '',
  currency2: '',
  currency2Symbol: '',
}

function ZapLiquidityWrapper({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
  const { chainId } = useActiveWeb3React()

  const { onOutputSelect } = useZapActionHandlers()

  useEffect(() => {
    // set default values if there are no URL params
    if (!currencyIdA || !currencyIdB) {
      onOutputSelect(
        chainId === ChainId.BSC
          ? {
              currency1: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
              currency2: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
            }
          : {
              currency1: '0x5d47baba0d66083c52009271faf3f50dcc01023c',
              currency2: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
            },
      )
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [chainId])

  const onChangeLiquidityType = useCallback(
    (newLiquidityType: LiquidityTypes) => {
      if (newLiquidityType === LiquidityTypes.ADD) history.push('/add-liquidity')
    },
    [history],
  )

  const [recentTransactions] = useUserRecentTransactions()

  const { INPUT, OUTPUT, zapOutputList } = useZapState()

  const currencyA = currencyIdA || INPUT.currencyId
  // pendingg check below
  const currencyB = currencyIdB

  const outputCurrency = currencyIdB
    ? zapOutputList[chainId]?.find((farm) => farm.lpAddress === currencyB) || emptyOutput
    : OUTPUT

  const handleCurrenciesURL = useCallback(
    (field: Field, currency: string) => {
      const newCurrencyId = currency
      if (field === Field.INPUT) {
        if (newCurrencyId === currencyIdB) {
          history.push(`/zap/${currencyIdB}/${currencyIdA}`)
        } else if (currencyIdB) {
          history.push(`/zap/${newCurrencyId}/${currencyIdB}`)
        } else {
          history.push(`/zap/${newCurrencyId}`)
        }
      } else if (field === Field.OUTPUT) {
        if (newCurrencyId === currencyIdA) {
          if (currencyIdB) {
            history.push(`/zap/${currencyIdB}/${newCurrencyId}`)
          } else {
            history.push(`/zap/${newCurrencyId}`)
          }
        } else {
          history.push(`/zap/${currencyIdA || 'ETH'}/${newCurrencyId}`)
        }
      }
    },
    [currencyIdA, history, currencyIdB],
  )

  return (
    <Flex sx={dexStyles.pageContainer}>
      <Flex sx={{ flexDirection: 'column' }}>
        <Flex sx={dexStyles.dexContainer}>
          <DexNav zapSettings />
          <MyPositions />
          <LiquiditySelector liquidityType={LiquidityTypes.ZAP} onChangeLiquidityType={onChangeLiquidityType} />
          <ZapLiquidity
            currencyIdA={currencyA}
            currencyIdB={outputCurrency}
            handleCurrenciesURL={handleCurrenciesURL}
          />
        </Flex>
        {recentTransactions && <RecentTransactions />}
      </Flex>
    </Flex>
  )
}

export default React.memo(ZapLiquidityWrapper)
