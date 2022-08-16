import { FC } from 'react'
import styles from '../scss/Nav.module.scss'
import NavProps from '../types/NavProps'

const Nav: FC<NavProps> = ({ isOpen, setIsOpen }: NavProps) => {
  return (
    <div className={styles.navigation}>
      <div className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <div className={styles.nav__item}>Home</div>
        <div className={styles.nav__item}>About</div>
        <div className={styles.nav__item}>Posts</div>
      </div>
      <div
        className={`${styles.burger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
export default Nav
