import { NextPage } from 'next'
import { URL_SERVER } from '../../constants/URLS'
import { MenuProps } from '../../types/MenuTypes'

const Menu: NextPage<MenuProps> = ({ data }) => {
  return <span>{JSON.stringify(data)}</span>
}

export default Menu

export async function getStaticProps() {
  const responce = await fetch(URL_SERVER)
  const data = await responce.json()

  return {
    props: {
      data,
    },
  }
}
