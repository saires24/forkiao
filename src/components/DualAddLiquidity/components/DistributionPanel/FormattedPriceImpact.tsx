import { Percent } from '@ape.swap/sdk'
import React from 'react'
import { warningSeverity } from 'utils/prices'
import { ONE_BIPS } from 'config/constants'
import styled from 'styled-components'
import { Text } from '@ape.swap/uikit'

/**
 * Formatted version of price impact text with warning colors
 */
export default function FormattedPriceImpact({ priceImpact }: { priceImpact?: Percent }) {
  return (
    <ErrorText fontSize="14px" severity={warningSeverity(priceImpact)} style={{ lineHeight: '15px' }}>
      {priceImpact ? (priceImpact.lessThan(ONE_BIPS) ? '<0.01%' : `${priceImpact.toFixed(2)}%`) : '-'}
    </ErrorText>
  )
}

export const ErrorText = styled(Text)<{ severity?: 0 | 1 | 2 | 3 | 4 }>`
  font-size: 12px;
  color: ${({ theme, severity }) =>
    severity === 3 || severity === 4
      ? theme.colors.error
      : severity === 2
      ? theme.colors.yellow
      : severity === 1
      ? theme.colors.text
      : theme.colors.success};
`
