import { ThemeUIStyleObject } from 'theme-ui'
import { textUnderlineHover } from '../../styles'
import styled from 'styled-components'
import { Tag } from '@ape.swap/uikit'

export const styles: Record<string, ThemeUIStyleObject> = {
  swapSwitchContainer: {
    width: '100%',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapSwitchButton: {
    backgroundColor: 'yellow',
    height: '30px',
    width: '30px',
    borderRadius: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  liquiditySelector: {
    position: 'relative',
    alignItems: 'center',
    cursor: 'pointer',
    margin: '0 20px',
    ...textUnderlineHover,
  },
  liquiditySelectorContainer: {
    marginBottom: '15px',
    justifyContent: 'center',
    fontSize: '14px',
  },
  migrate: { margin: '0 20px', position: 'relative', alignItems: 'center', color: 'textDisabled' },
}

export const StyledTag = styled(Tag)`
  font-size: 10px;
  padding: 0px 6px !important;
  margin-left: 5px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  height: auto;
  width: max-content;
`
