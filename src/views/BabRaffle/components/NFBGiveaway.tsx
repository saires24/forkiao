/** @jsxImportSource theme-ui */
import { Flex, Link, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import ReactPlayer from 'react-player'

const BabInfoCard: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Flex
      sx={{
        background: 'white2',
        padding: '20px',
        borderRadius: '10px',
        mt: '25px',
        minHeight: '400px',
        width: '100%',
        alignItems: 'center',
        '@media screen and (max-width: 725px)': { flexWrap: 'wrap-reverse' },
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          padding: '20px 10px 0px 0px',
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            padding: '0px 20px 0px 30px',
            mr: '30px',
            '@media screen and (max-width: 725px)': {
              padding: '0px 0px',
              alignItems: 'center',
              justifyContent: 'center',
              mr: '0px',
            },
          }}
        >
          <Text
            size="28px"
            mb="24px"
            weight={600}
            sx={{
              textAlign: 'left',
              lineHeight: '35px',
              '@media screen and (max-width: 725px)': { textAlign: 'center' },
            }}
          >
            {t('Join the 30-day Non-fungible Banana NFT Raffle')}
          </Text>
          <Text
            size="16px"
            weight={500}
            sx={{ textAlign: 'left', '@media screen and (max-width: 725px)': { textAlign: 'center' } }}
          >
            {t(`During the month of October the big 30-day ApeSwapNFT raffle will start.`)}
            <br />
            <br />
            {t(
              `Holders of an ApeSwap BAB NFT automatically participate in the daily raffles. Make sure to come back to this page daily in October to see if you have won a Non-fungible Banana NFT.`,
            )}
            <br />
            <br />
          </Text>
          <Text
            size="20px"
            style={{ textDecoration: 'underline', marginTop: '25px', alignSelf: 'center', textAlign: 'center' }}
          >
            <Link
              href="https://ape-swap.medium.com/apeswap-adds-launch-support-for-binances-first-soulbound-token-dbb2e0e4c263"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Learn more at our medium article')}
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <ReactPlayer
          playing
          muted
          loop
          url="videos/bab-nfb.mp4"
          height="100%"
          borderRadius="10px"
          width="100%"
          playsInline
        />
      </Flex>
    </Flex>
  )
}

export default React.memo(BabInfoCard)
