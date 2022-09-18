import { ChainId, Currency, CurrencyAmount, JSBI, Pair, Percent, Token, TokenAmount, ZapType } from '@ape.swap/sdk'
import { createAction } from '@reduxjs/toolkit'
import { PairState } from 'hooks/usePairs'
import { ParsedFarm } from './reducer'

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

type CurrencyOut = {
  outputCurrency: Token
  path: Token[]
  outputAmount: CurrencyAmount
  minOutputAmount: string
}

export type MergedZap = {
  currencyIn: {
    currency: Currency
    inputAmount: JSBI
  }
  currencyOut1: CurrencyOut
  currencyOut2: CurrencyOut
  pairOut: {
    pair: Pair
    pairState: PairState
    inAmount: { token1: CurrencyAmount; token2: CurrencyAmount }
    minInAmount: { token1: string; token2: string }
    totalPairSupply: TokenAmount
    liquidityMinted: TokenAmount
    poolTokenPercentage: Percent
  }
  liquidityProviderFee: CurrencyAmount
  totalPriceImpact: Percent
  chainId: ChainId
}

export const selectInputCurrency = createAction<{ currencyId: string }>('zap/selectInputCurrency')
export const selectOutputCurrency = createAction<{ currency1: string; currency2: string }>('zap/selectOutputCurrency')
export const setZapType = createAction<{ zapType: ZapType }>('zap/setZapType')
export const typeInput = createAction<{ field: Field; typedValue: string }>('zap/typeInput')
export const replaceZapState = createAction<{
  field: string
  typedValue: string
  inputCurrencyId?: string
  outputCurrencyId?: { currency1: string; currency2: string }
  recipient: string | null
  zapType: ZapType
}>('zap/replaceSwapState')
export const setRecipient = createAction<{ recipient: string | null }>('zap/setRecipient')
export const setInputList = createAction<{ zapInputList: { [symbol: string]: Token } }>('zap/setInputList')
export const setZapOutputList = createAction<{ zapOutputList: ParsedFarm[]; chainId: ChainId }>('zap/setOutputList')
export const setZapSlippage = createAction<{ zapSlippage: number }>('zap/setZapSlippage')
