import { NextPage } from 'next'
import { SyntheticEvent, useState } from 'react'
import ContainerBig from '../../components/Layouts/ContainerBig'
import Product from '../../components/Product'
import { DEFAULT_CATEGORY } from '../../constants'
import { URL_SERVER_NEW } from '../../constants/URLS'
import styles from '../../scss/Menu.module.scss'

const Menu: NextPage<any> = ({ sandwiches }: { sandwiches: Array<any> }) => {
  const [category, setCategory] = useState<string>(DEFAULT_CATEGORY)

  const [products, setProducts] = useState<Array<any>>(sandwiches)

  const btnHandler = async () => {}
  const selectHander = (e: SyntheticEvent<HTMLSelectElement, Event>) => {}

  return (
    <ContainerBig>
      <div className={styles.menu}>
        <h2>Menu Page</h2>
        <span className={styles.menu__item}>Select the category:</span>
        <select defaultValue={DEFAULT_CATEGORY} onSelect={selectHander} className={`${styles.menu__select} ${styles.menu__item}`}>
          <option value='sandwiches'>Sandwiches</option>
          <option value='pizza'>Pizza</option>
          <option value='burgers'>Burgers</option>
          <option value='salads'>Salads</option>
          <option value='drinks'>Drinks</option>
        </select>
        <button onClick={btnHandler} className={`${styles.menu__btn} ${styles.menu__item}`}>
          Show
        </button>
        <div className={styles.content}>
          {products.map((el) => {
            return <Product key={el.id} name={el.name} price={el.price} description={el.description}></Product>
          })}
        </div>
      </div>
    </ContainerBig>
  )
}

export default Menu

export async function getStaticProps() {
  const responce = await fetch(URL_SERVER_NEW)
  const data = await responce.json()
  const menu: Array<any> = data.menu
  const sandwiches = menu.filter((el) => el.category === 'sandwiches')

  return {
    props: {
      sandwiches,
    },
  }
}
