import { URL_SERVER, URL_SERVER_DEV } from '../../constants/URLS'
import Menu from './Menu'

export default Menu

// IF DEV DEVELOPMENT CHANGE URL FOR SERVER
// DEV - URL_SERVER_DEV
// PROD - URL_SERVER

export async function getStaticProps() {
  const responce = await fetch(URL_SERVER_DEV)
  const data = await responce.json()
  const menuProp: Array<any> = data.menu

  return {
    props: {
      menuProp,
    },
  }
}
