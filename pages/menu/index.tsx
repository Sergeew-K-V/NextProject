import { NextPage } from 'next'
import { MenuProps } from '../../types/MenuTypes'

const Menu: NextPage<MenuProps> = ({ data }) => {
  return <span>{JSON.stringify(data)}</span>
}

export default Menu

export async function getStaticProps() {
  const responce = await fetch('http://localhost:8080/')
  const data = await responce.json()

  return {
    props: {
      data,
    },
  }
}
