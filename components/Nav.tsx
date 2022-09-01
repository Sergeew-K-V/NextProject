import Link from 'next/link'
import { FC } from 'react'
import styles from '../scss/Nav.module.scss'
import NavProps from '../types/NavProps'

const Nav: FC<NavProps> = ({ isOpen, setIsOpen }: NavProps) => {
  return (
    <div className={styles.navigation}>
      <div className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <div className={styles.nav__item}>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </div>
        <div className={styles.nav__item}>
          <Link href='/about'>
            <a>About</a>
          </Link>
        </div>
        <div className={styles.nav__item}>
          <Link href='/posts'>
            <a>Posts</a>
          </Link>
        </div>
        <div className={styles.nav__item}>
          <Link href='/menu'>
            <a>Menu</a>
          </Link>
        </div>
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
