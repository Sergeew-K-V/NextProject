import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import styles from '../../scss/MainTheme.module.scss'
import Footer from '../Footer'
import Navbar from '../Navbar'

const MainTheme: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Next App</title>
      </Head>
      <div className={styles.wrapper}>
        <Navbar />
        <main className={styles.content}>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default MainTheme
