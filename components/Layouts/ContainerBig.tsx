import { FC, PropsWithChildren } from 'react'
import styles from '../../scss/ContainerBig.module.scss'

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default Container
