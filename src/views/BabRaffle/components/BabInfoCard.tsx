/** @jsxImportSource theme-ui */
import { Button, Flex, Spinner, Text } from '@ape.swap/uikit'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import ReactPlayer from 'react-player'
import { useClaimRaffle, useFetchBabToken } from 'state/hooks'

const BabInfoCard: React.FC = () => {
  const { t } = useTranslation()
  const { tokenId, loading, holdsBab } = useFetchBabToken()
  const { claim, claiming, hasClaimed } = useClaimRaffle()
  const { account } = useActiveWeb3React()

  return (
    <Flex
      sx={{
        background: 'white2',
        padding: '20px',
        borderRadius: '10px',
        '@media screen and (max-width: 725px)': { flexWrap: 'wrap' },
      }}
    >
      <Flex>
        <ReactPlayer
          playing
          muted
          loop
          url="videos/bab-raffle.mp4"
          height="100%"
          maxHeight="100px"
          width="100%"
          playsInline
        />
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          padding: '20px 50px',
          '@media screen and (max-width: 725px)': { padding: '0px 0px' },
        }}
      >
        <Flex sx={{ flexDirection: 'column' }}>
          <Text size="28px" mb="24px" mt="15px" weight={600} sx={{ textAlign: 'center', lineHeight: '35px' }}>
            {t('Become Part of the ApeSwap-BAB Family')}
          </Text>
          <Text size="16px" weight={500} padding="0px 20px">
            {t(`ApeSwap is proud to be one of the premiere platforms to add Binance’s BAB (Binance Account Bound) token
              support at its launch.`)}{' '}
            <br />
            <br />
            {t(`To celebrate the launch of the BAB token, ApeSwap and Binance BNB Chain have partnered to create a unique,
              commemorative NFT, free to mint for BAB Token holders for the month of September 2022.`)}
            <br />
            <br />
          </Text>
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: '20px' }}>
          {!loading ? (
            <div>
              {!account ? (
                <UnlockButton />
              ) : (
                <div>
                  <Text fontSize="20px" padding="20px">
                    {!holdsBab
                      ? t('No BAB token found in wallet. Acquire a BAB token to continue!')
                      : t('Your wallet holds a BAB Token')}
                  </Text>
                  {holdsBab && (
                    <div>
                      {hasClaimed ? (
                        <Text fontSize="20px" padding="20px">
                          Raffle NFT Already Claimed! ✅
                        </Text>
                      ) : (
                        <Button onClick={() => claim(tokenId)} disabled={claiming}>
                          Claim Raffle
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Spinner size={130} />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(BabInfoCard)
