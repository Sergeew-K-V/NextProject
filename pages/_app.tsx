import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MainTheme from '../components/Layouts/MainTheme'

function MyApp({ Component, pageProps }: AppProps) {
  // console.log('Component', Component)
  // console.log('pageProps', pageProps)
  return (
    <MainTheme>
      <Component {...pageProps} />
    </MainTheme>
  )
}

export default MyApp

