/** @jsxImportSource theme-ui */
import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import { Flex, Modal } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import LPSearcher from './LPSearcher'
import { ParsedFarm } from 'state/zap/reducer'

interface LPSearchModalProps {
  onLpSelect: (farm: ParsedFarm) => void
  onDismiss?: () => void
}

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  overflow-y: scroll;
  ${({ theme }) => theme.mediaQueries.xs} {
    max-height: none;
    overflow-y: auto;
  }
`

const LPSearchModal = ({ onDismiss = () => null, onLpSelect }: LPSearchModalProps) => {
  const { t } = useTranslation()
  const handleLPSelect = useCallback(
    (farm: ParsedFarm) => {
      onDismiss()
      onLpSelect(farm)
    },
    [onDismiss, onLpSelect],
  )

  const modalProps = {
    sx: {
      zIndex: 10,
      overflowY: 'auto',
      maxHeight: 'calc(100% - 30px)',
      minWidth: ['90%', '420px'],
      width: '200px',
      maxWidth: '425px',
    },
  }

  return (
    <Modal onDismiss={onDismiss} title={t('LP Tokens')} open {...modalProps}>
      <ScrollableContainer>
        <Flex sx={{ flexDirection: 'column', width: '380px', maxWidth: '100%' }}>
          <LPSearcher onLpSelect={handleLPSelect} />
        </Flex>
      </ScrollableContainer>
    </Modal>
  )
}

export default React.memo(LPSearchModal)
