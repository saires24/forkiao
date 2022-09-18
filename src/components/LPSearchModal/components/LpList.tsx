/** @jsxImportSource theme-ui */
import React, { useCallback } from 'react'
import { ParsedFarm } from 'state/zap/reducer'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import LpRow from './LPRow'
import UseTokenBalance from 'hooks/useTokenBalance'

interface LpListProps {
  lps: ParsedFarm[]
  onLpSelect?: (farm: ParsedFarm) => void
}

const CustomFixedList = styled(FixedSizeList)`
  border-radius: 10px 0px 0px 10px;
`

const LpList: React.FC<LpListProps> = ({ lps, onLpSelect }) => {
  const Row = useCallback(
    ({ data, index, style }) => {
      const farm: ParsedFarm = data[index]
      const handleSelect = () => onLpSelect(farm)
      const balance = UseTokenBalance(farm.lpAddress).toString()
      return <LpRow style={style} farm={farm} onLpSelect={handleSelect} balance={balance} />
    },
    [onLpSelect],
  )

  return (
    <CustomFixedList height={300} width="100%" itemData={lps} itemCount={lps.length} itemSize={45}>
      {Row}
    </CustomFixedList>
  )
}

export default React.memo(LpList)
