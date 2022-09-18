/** @jsxImportSource theme-ui */
import React, { useMemo, useState } from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import { Input as NumericalInput } from 'components/CurrencyInputPanel/NumericalInput'
import { useTranslation } from 'contexts/Localization'
import LPSelector from './LPSelector'
import { styles } from '../styles'
import { getBalanceNumber } from 'utils/formatBalance'
import { ParsedFarm } from 'state/zap/reducer'
import { Pair } from '@ape.swap/sdk'
import { getTokenUsdPrice } from 'utils/getTokenUsdPrice'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Spinner } from 'theme-ui'
import BigNumber from 'bignumber.js'
import UseTokenBalance from 'hooks/useTokenBalance'

export interface ZapPanelProps {
  value: string
  onLpSelect: (farm: ParsedFarm) => void
  lpPair: Pair
}

const ZapPanel: React.FC<ZapPanelProps> = ({ value, onLpSelect, lpPair }) => {
  const { account, chainId } = useActiveWeb3React()
  const balance = UseTokenBalance(lpPair?.liquidityToken?.address).toString()
  const displayBalance = balance === '0' ? '0' : getBalanceNumber(new BigNumber(balance), 18).toFixed(6)
  const { t } = useTranslation()
  const [usdVal, setUsdVal] = useState(null)

  useMemo(async () => {
    setUsdVal(null)
    setUsdVal(await getTokenUsdPrice(chainId, lpPair?.liquidityToken?.address, 18, true))
  }, [chainId, lpPair?.liquidityToken?.address])

  return (
    <Flex sx={styles.dexPanelContainer}>
      <Flex sx={styles.panelTopContainer}>
        <Text sx={styles.swapDirectionText}>{t('To')}:</Text>
        <NumericalInput value={value} onUserInput={null} align="left" id="token-amount-input" readOnly />
        <LPSelector lpPair={lpPair} onLpSelect={onLpSelect} />
      </Flex>
      <Flex sx={styles.panelBottomContainer}>
        <Flex sx={styles.centered}>
          <Text size="12px" sx={styles.panelBottomText}>
            {!usdVal && value !== '0.0' ? (
              <Spinner width="15px" height="15px" />
            ) : value !== '0.0' && usdVal !== 0 && value ? (
              `∼$${(usdVal * parseFloat(value)).toFixed(2)}`
            ) : null}
          </Text>
        </Flex>
        <Flex sx={{ alignItems: 'center' }}>
          {account ? (
            <Text size="12px" sx={styles.panelBottomText}>
              {t('Balance: %balance%', { balance: displayBalance || 'loading' })}
            </Text>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(ZapPanel)
