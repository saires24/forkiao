/** @jsxImportSource theme-ui */
import React, { CSSProperties } from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import ServiceTokenDisplay from '../../ServiceTokenDisplay'
import Balance from '../Balance'
import { ParsedFarm } from 'state/zap/reducer'
import { styles } from '../styles'

interface LPRowProps {
  farm?: ParsedFarm
  onLpSelect?: (farm: ParsedFarm) => void
  style: CSSProperties
  balance: string
}

const LPRow: React.FC<LPRowProps> = ({ farm, onLpSelect, style, balance }) => {
  return (
    <Flex sx={styles.LpRowContainer} onClick={onLpSelect} style={style}>
      <Flex sx={{ alignItems: 'center' }}>
        <ServiceTokenDisplay token1={farm.currency1Symbol} token2={farm.currency2Symbol} noEarnToken={true} />
        <Text title={farm.lpSymbol} weight={700} sx={{ lineHeight: '22px', marginLeft: '5px' }}>
          {farm.lpSymbol}
        </Text>
      </Flex>
      <Balance balance={balance} />
    </Flex>
  )
}

export default React.memo(LPRow)
