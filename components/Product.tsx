import { FC } from 'react'
import styles from '../scss/Product.module.scss'

const Product: FC<{
  name: string
  description: string
  price: number
}> = (props: { name: string; description: string; price: number }) => {
  return (
    <div className={styles.product}>
      <h3>{props.name}</h3>
      <p className={styles.desription}>{props.description}</p>
      <p>Price: {props.price}</p>
    </div>
  )
}

export default Product
