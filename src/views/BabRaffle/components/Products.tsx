/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'
import { Flex, Skeleton, Text } from '@apeswapfinance/uikit'
import { Flex as V2Flex, Text as V2Text } from '@ape.swap/uikit'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { ServiceData } from 'state/types'
import { useFetchHomepageServiceStats, useHomepageServiceStats } from 'state/hooks'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { useTranslation } from 'contexts/Localization'
import { getDotPos } from 'utils/getDotPos'
import { YieldCard } from 'views/Homepage/components/Services/styles'
import { defaultServiceData } from 'views/Homepage/components/Services/defaultServiceData'

const Services: React.FC = () => {
  const [loadServices, setLoadServices] = useState(false)
  useFetchHomepageServiceStats(loadServices)
  const [, setActiveSlide] = useState(0)
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const { t } = useTranslation()
  const serviceData = useHomepageServiceStats()
  const displayData =
    serviceData &&
    defaultServiceData(t).map((service) => {
      return { ...service, stats: serviceData[service.id] }
    })

  const handleSlide = (event: SwiperCore) => {
    const slideNumber = getDotPos(event.activeIndex, displayData.length)
    setActiveSlide(slideNumber)
  }

  useEffect(() => {
    if (isIntersecting) {
      setLoadServices(true)
    }
  }, [isIntersecting])

  const handleEachService = (id: string, service: ServiceData) => {
    if (id === 'farmDetails' || id === 'poolDetails' || id === 'billDetails') {
      const tokenImage =
        id === 'farmDetails'
          ? service.stakeToken.name.split('-')
          : id === 'billDetails'
          ? service?.lpTokenName.split('-')
          : [service.stakeToken.name, service.rewardToken.name]
      const name =
        id === 'farmDetails'
          ? service.stakeToken.name
          : id === 'billDetails'
          ? service?.lpTokenName
          : service.rewardToken.name
      return { name, tokenImage }
    }
    if (id === 'lendingDetails') {
      return { name: service.marketName, tokenImage: [service.token.name] }
    }
    return {}
  }

  const displayStats = (id: string, link: string, stats: ServiceData[]) => {
    return (
      <>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          style={{ position: 'absolute', bottom: '60px', height: '250px', width: '300px' }}
        >
          {stats?.map((stat) => {
            const { name, tokenImage } = handleEachService(id, stat)
            return (
              <a href={stat?.link} rel="noopener noreferrer" key={stat?.apr}>
                <Flex
                  mt="5px"
                  mb="5px"
                  pl="20px"
                  style={{
                    width: '100%',
                    height: '70px',
                    background: 'rgba(11, 11, 11, .55)',
                    borderRadius: '10px',
                  }}
                >
                  {id === 'farmDetails' ? (
                    <ServiceTokenDisplay
                      token1={tokenImage[0]}
                      token2={tokenImage[1]}
                      token3={stat.rewardToken.name}
                      stakeLp
                      iconFill="white"
                    />
                  ) : id === 'billDetails' ? (
                    <ServiceTokenDisplay
                      token1={tokenImage[0]}
                      token2={tokenImage[1]}
                      token3={stat.earnTokenName}
                      stakeLp
                      billArrow
                      iconFill="white"
                    />
                  ) : id === 'poolDetails' ? (
                    <ServiceTokenDisplay token1={tokenImage[0]} token2={tokenImage[1]} iconFill="white" />
                  ) : (
                    <ServiceTokenDisplay token1={tokenImage[0]} />
                  )}
                  <Flex pl="15px" justifyContent="center" flexDirection="column">
                    <Text bold style={{ width: '100%', color: 'white' }}>
                      {name}
                    </Text>
                    {id === 'lendingDetails' ? (
                      <Text style={{ width: '100%', color: 'white' }}>APY: {stat.apy.toFixed(2)}%</Text>
                    ) : id === 'billDetails' ? (
                      <Text style={{ width: '100%', color: 'white' }}>
                        Discount:{' '}
                        <span style={{ color: stat.discount > 0 ? 'white' : '#DF4141' }}>
                          {stat.discount.toFixed(2)}%
                        </span>
                      </Text>
                    ) : (
                      <Text style={{ width: '100%', color: 'white' }}>APR: {(stat.apr * 100).toFixed(2)}%</Text>
                    )}
                  </Flex>
                </Flex>
              </a>
            )
          })}
        </Flex>
        <a href={link} rel="noopener noreferrer">
          <Flex alignItems="center" justifyContent="center" style={{ textAlign: 'center' }}>
            <Text color="white" fontSize="16px" bold>
              {t('See All')} {'>'}
            </Text>
          </Flex>
        </a>
      </>
    )
  }

  return (
    <>
      <div ref={observerRef} />
      <V2Flex
        flexWrap="wrap"
        flexDirection="column"
        alignItems="center"
        sx={{
          width: '100%',
          backgroundColor: 'white1',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30px 20px',
          mt: '25px',
          borderRadius: '10px',
          '@media screen and (max-width: 725px)': {
            padding: '30px 0px',
          },
        }}
      >
        <V2Text mb="50px" mt="20px" weight={600} size="28px" style={{ textAlign: 'center', lineHeight: '30px' }}>
          {t('Featured ApeSwap Products')}
        </V2Text>
        <Flex style={{ width: '100%' }}>
          {displayData ? (
            <Swiper
              id="serviceBabSwiper"
              initialSlide={0}
              spaceBetween={20}
              slidesPerView="auto"
              loopedSlides={displayData?.length}
              autoplay={{ delay: 5000 }}
              loop
              centeredSlides
              resizeObserver
              lazy
              preloadImages={false}
              onSlideChange={handleSlide}
            >
              {displayData?.map((service) => {
                return (
                  <SwiperSlide style={{ maxWidth: '338px', minWidth: '338px' }} key={service.title}>
                    <YieldCard image={service.backgroundImg}>
                      <Flex flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                        <Flex flexDirection="column">
                          <Flex>
                            <Text color="white" fontSize="23px" bold>
                              {service.title}
                            </Text>
                          </Flex>
                          <Flex padding="0px 40px 0px 0px">
                            <Text color="white" bold fontSize="15px">
                              {service.description}
                            </Text>
                          </Flex>
                        </Flex>
                        {displayStats(service.id, service.link, service.stats)}
                      </Flex>
                    </YieldCard>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          ) : (
            [...Array(3)].map((i) => {
              return (
                <YieldCard key={i}>
                  <Skeleton height="100%" width="100%" />
                </YieldCard>
              )
            })
          )}
        </Flex>
      </V2Flex>
    </>
  )
}

export default React.memo(Services)
