import { NextPage } from 'next'
import { PropsWithChildren, useState } from 'react'
import Web3 from 'web3'
import { BlockHeader, Block } from 'web3-eth' // ex. package types
import { ContainerBig } from '../../components/Layouts'
import styles from '../../scss/Crypto.module.scss'

const Crypto: NextPage<PropsWithChildren> = () => {
  const [connected, setConnected] = useState<boolean>(true)
  const web3 = new Web3('ws://localhost:3000')

  const mintHandler = () => {
    console.log(10)
    console.log(web3)
  }

  return (
    <ContainerBig>
      <div className={styles.content}>
        <form onSubmit={(e) => e.preventDefault()}>
          <h2> Here you can mint token!</h2>
          <div className={styles.description}>You`ll be owner of unique token. It`ll be placed in one of multiple blockchains.</div>
          <div className={styles.description}>But before this action. You need to connect your wallet for minting.</div>
          <button className={styles.btn}>Connect wallet</button>
          <div className={styles.description}>Let`s go to mint your token!</div>
          <button onClick={mintHandler} className={styles.btn} disabled={connected ? false : true}>
            Mint token
          </button>
        </form>
      </div>
    </ContainerBig>
  )
}

export default Crypto
