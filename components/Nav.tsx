import { FC } from 'react'
import styles from '../scss/Nav.module.scss'

const Nav: FC = () => {
  return (
    <div className={styles.nav}>
      <div>Home</div>
      <div>Posts</div>
      <div>Abouts</div>
    </div>
  )
}

export default Nav
