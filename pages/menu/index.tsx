import { DEFAULT_CATEGORY } from '../../constants'
import { URL_SERVER_NEW } from '../../constants/URLS'
import Menu from './Menu'

export default Menu

export async function getStaticProps() {
  const responce = await fetch(URL_SERVER_NEW)
  const data = await responce.json()
  const menu: Array<any> = data.menu
  const sandwiches = menu.filter((el) => el.category === DEFAULT_CATEGORY)

  return {
    props: {
      sandwiches,
    },
  }
}
