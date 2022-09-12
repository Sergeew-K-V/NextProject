import styles from '../scss/Footer.module.scss'
import Container from './Layouts/Container'
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.reserved}>All rights reserved</div>
          <div className={styles.madeBy}>Made by Fobbelend</div>
          <div className={styles.github}>
            <a href='https://github.com/Sergeew-K-V' rel='noreferrer' target={'_blank'}>
              Github
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
export default Footer
