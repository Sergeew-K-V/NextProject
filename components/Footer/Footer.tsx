import styles from '../../scss/Footer.module.scss'
import Container from '../Layouts/Container'
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.reserved}>All rights reserved</div>
          <div className={styles.madeBy}>Made by Fobbelend</div>
          <div></div>
        </div>
      </Container>
    </footer>
  )
}
export default Footer
