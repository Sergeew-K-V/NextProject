import styles from '../scss/Navbar.module.scss'
import Container from './Layouts/Container'
import Nav from './Nav'

const Navbar = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          <div className={styles.logo}>Next Site</div>
          <Nav />
        </div>
      </Container>
    </header>
  )
}

export default Navbar
