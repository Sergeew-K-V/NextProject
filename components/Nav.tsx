import Link from 'next/link'
import { FC } from 'react'
import styles from '../scss/Nav.module.scss'
import { NavProps } from '../types/NavProps'

const Nav: FC<NavProps> = ({ isOpen, setIsOpen }: NavProps) => {
  const CloseMenu = () => setIsOpen(false)

  return (
    <div className={styles.navigation}>
      <div className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <div className={styles.nav__item}>
          <Link href='/'>
            <a onClick={CloseMenu}>Home</a>
          </Link>
        </div>
        <div className={styles.nav__item}>
          <Link href='/about'>
            <a onClick={CloseMenu}>About</a>
          </Link>
        </div>
        <div className={styles.nav__item}>
          <Link href='/labs'>
            <a onClick={CloseMenu}>Labs</a>
          </Link>
        </div>
        <div className={styles.nav__item}>
          <Link href='/java'>
            <a onClick={CloseMenu}>Java</a>
          </Link>
        </div>
        <div className={styles.nav__item}>
          <Link href='/posts'>
            <a onClick={CloseMenu}>Posts</a>
          </Link>
        </div>
        <div className={styles.nav__item}>
          <Link href='/menu'>
            <a onClick={CloseMenu}>Menu</a>
          </Link>
        </div>
        <div className={styles.nav__item}>
          <Link href='/crypto'>
            <a onClick={CloseMenu}>CRYPTO</a>
          </Link>
        </div>
      </div>
      <div className={`${styles.burger} ${isOpen ? styles.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
export default Nav
