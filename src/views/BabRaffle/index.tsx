/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import Banner from 'components/Banner'
import SwiperProvider from 'contexts/SwiperProvider'
import Values from 'views/Homepage/components/Values/Values'
import BabInfoCard from './components/BabInfoCard'
import NFBGiveaway from './components/NFBGiveaway'
import Products from './components/Products'

const Nft = () => {
  const { t } = useTranslation()

  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mb: '100px',
        marginTop: '10px',
      }}
    >
      <Flex sx={{ flexDirection: 'column', padding: '0px 10px', width: '100%', maxWidth: '1150px' }}>
        <Banner
          banner="BABbanner"
          link="https://ape-swap.medium.com/apeswap-adds-launch-support-for-binances-first-soulbound-token-dbb2e0e4c263"
          title={t('ApeSwap BAB Pass')}
          margin="0 0 20px 0"
        />
        <BabInfoCard />
        <NFBGiveaway />
        <SwiperProvider>
          <Products />
        </SwiperProvider>
        <Flex sx={{ marginTop: '25px' }} />
        <SwiperProvider>
          <Values />
        </SwiperProvider>
      </Flex>
    </Flex>
  )
}

export default Nft
