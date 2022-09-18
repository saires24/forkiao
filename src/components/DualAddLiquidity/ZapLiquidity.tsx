import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Link, Svg, Text } from '@ape.swap/uikit'
import DexPanel from 'views/Dex/components/DexPanel'
import { useCurrency } from 'hooks/Tokens'
import { Currency, CurrencyAmount } from '@ape.swap/sdk'
import maxAmountSpend from 'utils/maxAmountSpend'
import ZapPanel from './components/ZapPanel'
import { Field } from 'state/zap/actions'
import { useDerivedZapInfo, useSetInitialZapData, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import ZapLiquidityActions from './components/ZapLiquidityActions'
import { styles } from './styles'
import { useZapCallback } from 'hooks/useZapCallback'
import DistributionPanel from './components/DistributionPanel/DistributionPanel'
import { ParsedFarm } from '../../state/zap/reducer'
import { currencyId } from '../../utils/currencyId'

interface ZapLiquidityProps {
  currencyIdA?: string
  currencyIdB?: { currency1: string; currency2: string }
  handleCurrenciesURL?: (Field, currencyAddress: string) => void
}

const ZapLiquidity: React.FC<ZapLiquidityProps> = ({ currencyIdA, currencyIdB, handleCurrenciesURL }) => {
  const [{ zapErrorMessage, txHash }, setZapState] = useState<{
    zapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    zapErrorMessage: undefined,
    txHash: undefined,
  })
  useSetInitialZapData()

  const { INPUT, OUTPUT, typedValue, recipient, zapType, zapSlippage } = useZapState()

  const currencyA = currencyIdA || INPUT.currencyId
  const currencyB = currencyIdB || OUTPUT

  const inputCurrency = useCurrency(currencyA)
  const outputCurrency = currencyB

  const {
    zap,
    inputError: zapInputError,
    currencyBalances,
  } = useDerivedZapInfo(typedValue, inputCurrency, outputCurrency, recipient)
  const { onUserInput, onInputSelect, onOutputSelect } = useZapActionHandlers()

  const handleInputSelect = useCallback(
    (field: Field, currency: Currency) => {
      const currencyAddress = currencyId(currency)
      if (handleCurrenciesURL) handleCurrenciesURL(field, currencyAddress)
      onInputSelect(field, currency)
    },
    [handleCurrenciesURL, onInputSelect],
  )

  const handleOutputSelect = useCallback(
    (farm: ParsedFarm) => {
      if (handleCurrenciesURL) handleCurrenciesURL(Field.OUTPUT, farm.lpAddress)
      onOutputSelect(farm)
    },
    [handleCurrenciesURL, onOutputSelect],
  )

  const { callback: zapCallback } = useZapCallback(zap, zapType, zapSlippage, recipient, '', null)

  const handleZap = useCallback(() => {
    setZapState({
      zapErrorMessage: undefined,
      txHash: undefined,
    })
    zapCallback()
      .then((hash) => {
        setZapState({
          zapErrorMessage: undefined,
          txHash: hash,
        })
      })
      .catch((error) => {
        setZapState({
          zapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [zapCallback])

  const handleDismissConfirmation = useCallback(() => {
    // clear zapState if user close the error modal
    setZapState({
      zapErrorMessage: undefined,
      txHash: undefined,
    })
  }, [setZapState])

  const handleMaxInput = useCallback(
    (field: Field) => {
      const maxAmounts: { [field in Field]?: CurrencyAmount } = {
        [Field.INPUT]: maxAmountSpend(currencyBalances[Field.INPUT]),
        [Field.OUTPUT]: maxAmountSpend(currencyBalances[Field.OUTPUT]),
      }
      if (maxAmounts) {
        onUserInput(field, maxAmounts[field]?.toExact() ?? '')
      }
    },
    [currencyBalances, onUserInput],
  )

  // reset input value to zero on first render
  useEffect(() => {
    onUserInput(Field.INPUT, '')
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  return (
    <div>
      <Flex sx={styles.liquidityContainer}>
        <Flex sx={{ marginTop: '30px' }}>
          <DexPanel
            value={typedValue}
            panelText="From:"
            currency={inputCurrency}
            otherCurrency={null}
            fieldType={Field.INPUT}
            onCurrencySelect={handleInputSelect}
            onUserInput={onUserInput}
            handleMaxInput={handleMaxInput}
            isZapInput
          />
        </Flex>
        <Flex sx={{ margin: '10px', justifyContent: 'center' }}>
          <Svg icon="ZapArrow" />
        </Flex>
        <ZapPanel
          value={zap?.pairOut?.liquidityMinted?.toSignificant(10) || '0.0'}
          onLpSelect={handleOutputSelect}
          lpPair={zap.pairOut.pair}
        />
        {typedValue && parseFloat(typedValue) > 0 && zap?.pairOut?.liquidityMinted && (
          <Flex sx={{ marginTop: '40px' }}>
            <DistributionPanel zap={zap} />
          </Flex>
        )}
        <ZapLiquidityActions
          zapInputError={zapInputError}
          zap={zap}
          handleZap={handleZap}
          zapErrorMessage={zapErrorMessage}
          txHash={txHash}
          handleDismissConfirmation={handleDismissConfirmation}
        />
        <Flex sx={{ marginTop: '10px', justifyContent: 'center' }}>
          <Link
            href="https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity"
            target="_blank"
            textAlign="center"
          >
            <Text size="12px" style={{ lineHeight: '18px', fontWeight: 400, textDecoration: 'underline' }}>
              Learn more{'>'}
            </Text>
          </Link>
        </Flex>
      </Flex>
    </div>
  )
}

export default React.memo(ZapLiquidity)
