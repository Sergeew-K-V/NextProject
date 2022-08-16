import { useState } from 'react'
import styles from '../scss/Navbar.module.scss'
import Container from './Layouts/Container'
import Nav from './Nav'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          <div className={styles.logo}>Next Site</div>
          <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </Container>
    </header>
  )
}

export default Navbar
