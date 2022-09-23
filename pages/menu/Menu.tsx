import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import ContainerBig from '../../components/Layouts/ContainerBig'
import Product from '../../components/Product'
import { DEFAULT_CATEGORY } from '../../constants'
import { URL_SERVER, URL_SERVER_DEV } from '../../constants/URLS'
import styles from '../../scss/Menu.module.scss'

//for good practice need to describe the props of sandwiches
const Menu: NextPage<any> = ({ menuProp }: { menuProp: Array<any> }) => {
  const [category, setCategory] = useState<string>(DEFAULT_CATEGORY)

  const [menu, setMenu] = useState(menuProp)
  const [products, setProducts] = useState<Array<any>>()

  const btnHandler = () => {
    getNewMenu()
  }
  const selectHander = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  // IF DEV DEVELOPMENT CHANGE URL FOR SERVER
  // DEV - URL_SERVER_DEV
  // PROD - URL_SERVER

  const getNewMenu = async () => {
    try {
      const responce = await fetch(URL_SERVER_NEW)
      if (responce.ok) {
        const data = await responce.json()
        setProducts(data.menu.filter((el: any) => el.category === category))
      }
    } catch (error) {
      alert(`Something was going wrong. ${error}`)
    }
  }

  useEffect(() => {
    setProducts(menu.filter((el) => el.category === DEFAULT_CATEGORY))
  }, [])

  return (
    <ContainerBig>
      <div className={styles.menu}>
        <h2>Menu Page</h2>
        <span className={styles.menu__item}>Select the category:</span>
        <select value={category} onChange={selectHander} className={`${styles.menu__select} ${styles.menu__item}`}>
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
          {products !== undefined
            ? products.map((el) => {
                return <Product key={el.id} name={el.name} price={el.price} description={el.description}></Product>
              })
            : ''}
        </div>
      </div>
    </ContainerBig>
  )
}

export default Menu
