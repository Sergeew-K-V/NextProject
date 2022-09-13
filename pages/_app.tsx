import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MainTheme from '../components/Layouts/MainTheme'
import { useEffect } from 'react'
import Web3 from 'web3'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const PROVIDER_URL = process.env.PROVIDER_URL

    if (PROVIDER_URL !== undefined) {
      const web3 = new Web3(PROVIDER_URL)
    }
  }, [])
  return (
    <MainTheme>
      <Component {...pageProps} />
    </MainTheme>
  )
}

export default MyApp
