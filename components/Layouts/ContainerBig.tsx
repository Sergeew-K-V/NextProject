import { FC, PropsWithChildren } from "react"
import styles from "../../scss/ContainerBig.module.scss"

const ContainerBig: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default ContainerBig
