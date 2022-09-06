import { NextPage } from 'next'
import { PropsWithChildren } from 'react'
import { ContainerBig } from '../../components/Layouts'
import styles from '../../scss/Crypto.module.scss'

const Crypto: NextPage<PropsWithChildren> = () => {
  return (
    <ContainerBig>
      <div className={styles.content}>
        <h2> Here you can mint token!</h2>
        <div className={styles.descrition}>You`ll be owner of unique token. It`ll be placed in one of multiple blockchains.</div>
        <button className={styles.btn}>Mint token</button>
      </div>
    </ContainerBig>
  )
}

export default Crypto
