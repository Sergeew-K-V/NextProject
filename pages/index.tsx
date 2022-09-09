import type { NextPage } from 'next'
import { useEffect } from 'react'
import Web3 from 'web3'
import ContainerBig from '../components/Layouts/ContainerBig'

const Home: NextPage = () => {
  useEffect(() => {
    const PROVIDER_URL = process.env.PROVIDER_URL

    if (PROVIDER_URL !== undefined) {
      const web3 = new Web3(PROVIDER_URL)
    }
  }, [])
  return (
    <div>
      <ContainerBig>
        <h1>Home Page</h1>
      </ContainerBig>
    </div>
  )
}

export default Home
