/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Flex, Svg, Text } from '@ape.swap/uikit'
import { styles } from '../../styles'
import { useTranslation } from 'contexts/Localization'
import { MergedZap } from 'state/zap/actions'
import DetailsPanel from './DetailsPanel'
import ConvertionPanel from './ConvertionPanel'

interface DistributionPanelProps {
  zap: MergedZap
}

const DistributionPanel: React.FC<DistributionPanelProps> = ({ zap }) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const { currencyOut1, currencyOut2, pairOut } = zap

  // This is the true value out as this is the estimated LP pair values
  const currencyOneOut = pairOut?.inAmount.token1.toSignificant(6)
  const currencyTwoOut = pairOut?.inAmount.token2.toSignificant(6)

  return (
    <Flex sx={styles.distributionPanelContainer}>
      <Flex sx={styles.panelTopContainer}>
        <Text sx={styles.swapDirectionText}>{t('Distribution')}:</Text>
      </Flex>
      <Flex sx={styles.pooledText} onClick={() => setExpanded(!expanded)}>
        {currencyOneOut} {currencyOut1?.outputCurrency?.symbol} & {currencyTwoOut}{' '}
        {currencyOut2?.outputCurrency?.symbol} Pooled
        <Svg icon="caret" direction={expanded ? 'up' : 'down'} width="10px" />
      </Flex>
      {expanded && (
        <Flex sx={{ flexDirection: 'column', marginTop: '20px' }}>
          <ConvertionPanel zap={zap} />
          <DetailsPanel zap={zap} />
        </Flex>
      )}
    </Flex>
  )
}

export default React.memo(DistributionPanel)
