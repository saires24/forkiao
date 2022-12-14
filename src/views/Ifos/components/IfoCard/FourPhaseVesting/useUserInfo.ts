import { useState, useEffect } from 'react'
import ifoAbi from 'config/abi/ifo.json'
import BigNumber from 'bignumber.js'
import useRefresh from 'hooks/useRefresh'
import multicall from 'utils/multicall'
import { BSC_BLOCK_TIME } from 'config'
import { Contract } from 'ethers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useBlockNumber from 'lib/hooks/useBlockNumber'

export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  tokenDecimals: number
  notLp?: boolean
  refetch?: boolean
}

function useUserInfo(contract: Contract, tokenDecimals: number, address: string, refetch?: boolean) {
  const currentBlock = useBlockNumber()
  const { fastRefresh } = useRefresh()
  const { account, chainId } = useActiveWeb3React()

  const [offeringTokenBalance, setOfferingTokenBalance] = useState(new BigNumber(0))
  const [userTokenStatus, setUserTokenStatus] = useState({
    stakeTokenHarvest: new BigNumber(0),
    offeringTokenHarvest: new BigNumber(0),
    offeringTokensVested: new BigNumber(0),
  })
  const [userInfo, setUserInfo] = useState({
    amount: new BigNumber(0),
    refunded: false,
    allocation: new BigNumber(0),
  })
  const [userHarvestedFlags, setUserHarvestedFlags] = useState([true, true, true, true])
  const [harvestBlockReleases, setHarvestBlockReleases] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
  })

  useEffect(() => {
    const fetch = async () => {
      if (!address || !account) return

      const calls1 = [
        {
          address,
          name: 'getOfferingAmount',
          params: [account],
        },
        {
          address,
          name: 'getUserAllocation',
          params: [account],
        },
        {
          address,
          name: 'userInfo',
          params: [account],
        },
        {
          address,
          name: 'userTokenStatus',
          params: [account],
        },
      ]

      const calls2 = [
        {
          address,
          name: 'hasHarvested',
          params: [account, 0],
        },
        {
          address,
          name: 'hasHarvested',
          params: [account, 1],
        },
        {
          address,
          name: 'hasHarvested',
          params: [account, 2],
        },
        {
          address,
          name: 'hasHarvested',
          params: [account, 3],
        },
      ]

      const calls3 = [
        {
          address,
          name: 'harvestReleaseBlocks',
          params: [0],
        },
        {
          address,
          name: 'harvestReleaseBlocks',
          params: [1],
        },
        {
          address,
          name: 'harvestReleaseBlocks',
          params: [2],
        },
        {
          address,
          name: 'harvestReleaseBlocks',
          params: [3],
        },
      ]

      try {
        const [balance, userAllocation, userinfo, userTokens] = await multicall(chainId, ifoAbi, calls1)

        const [harvestOneFlag, harvestTwoFlag, harvestThreeFlag, harvestFourFlag] = await multicall(
          chainId,
          ifoAbi,
          calls2,
        )

        const [harvestOneBlock, harvestTwoBlock, harvestThreeBlock, harvestFourBlock] = await multicall(
          chainId,
          ifoAbi,
          calls3,
        )

        setOfferingTokenBalance(new BigNumber(balance?.toString()))

        // Get block release times in seconds
        setHarvestBlockReleases({
          one: (harvestOneBlock - currentBlock) * BSC_BLOCK_TIME,
          two: (harvestTwoBlock - currentBlock) * BSC_BLOCK_TIME,
          three: (harvestThreeBlock - currentBlock) * BSC_BLOCK_TIME,
          four: (harvestFourBlock - currentBlock) * BSC_BLOCK_TIME,
        })

        setUserHarvestedFlags([harvestOneFlag[0], harvestTwoFlag[0], harvestThreeFlag[0], harvestFourFlag[0]])

        setUserTokenStatus({
          stakeTokenHarvest: new BigNumber(userTokens.stakeTokenHarvest.toString()),
          offeringTokenHarvest: new BigNumber(userTokens.offeringTokenHarvest.toString()),
          offeringTokensVested: new BigNumber(userTokens.offeringTokensVested.toString()),
        })

        setUserInfo({
          amount: new BigNumber(userinfo.amount.toString()),
          refunded: userinfo.refunded,
          allocation: new BigNumber(userAllocation.toString()).dividedBy(new BigNumber(10).pow(12)),
        })
      } catch (e) {
        console.error('Multicall error', e, { address, account, chainId })
      }
    }

    if (address && account) {
      fetch()
    }
  }, [account, contract, address, refetch, fastRefresh, chainId, tokenDecimals, currentBlock])

  return {
    userTokenStatus,
    userInfo,
    harvestBlockReleases,
    userHarvestedFlags,
    offeringTokenBalance,
  }
}

export default useUserInfo
