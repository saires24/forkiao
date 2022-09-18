/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Svg, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { StyledTag, styles } from './styles'

export enum LiquidityTypes {
  ADD = 'ADD',
  ZAP = 'ZAP',
  MIGRATE = 'MIGRATE',
}

interface LiquiditySelectorProps {
  liquidityType: string
  onChangeLiquidityType: (LiquidityTypes) => void
}

const LiquiditySelector: React.FC<LiquiditySelectorProps> = ({ liquidityType, onChangeLiquidityType }) => {
  const { t } = useTranslation()
  return (
    <Flex sx={styles.liquiditySelectorContainer}>
      <Flex
        sx={{
          ...styles.liquiditySelector,
          color: liquidityType !== LiquidityTypes.ADD ? 'textDisabled' : null,
        }}
        onClick={() => onChangeLiquidityType(LiquidityTypes.ADD)}
      >
        <Text>{t('+ Add')}</Text>
      </Flex>
      <Flex
        sx={{
          ...styles.liquiditySelector,
          color: liquidityType !== LiquidityTypes.ZAP ? 'textDisabled' : null,
        }}
        onClick={() => onChangeLiquidityType(LiquidityTypes.ZAP)}
      >
        <Flex sx={{ marginRight: '5px' }}>
          <Svg color={liquidityType !== LiquidityTypes.ZAP ? 'textDisabled' : 'text'} icon={'ZapIcon'} />
        </Flex>
        <Text>{t('Zap')}</Text>
      </Flex>
      <Flex sx={styles.migrate}>
        <Text>{t('Migrate')} </Text>
        <StyledTag variant={'binance'}> {t('Soon')} </StyledTag>
      </Flex>
    </Flex>
  )
}

export default React.memo(LiquiditySelector)
