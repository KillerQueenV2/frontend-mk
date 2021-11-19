import styles from "./styles.module.scss";

import {MdAddShoppingCart} from "react-icons/md";
import {Link} from "react-router-dom";

interface CardProps {
  image: string
  title: string
  price: string
  quantidade: number
  id: string
  handleAddToCart: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void
  handleRemoveToCart: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void
  addedToCart: boolean
}

export function Card({id, image, title, price, quantidade, handleAddToCart, addedToCart, handleRemoveToCart}: CardProps) {
  return (
    <div className={styles.card}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.productImage}>
          <img src={image} alt="product" />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productName}>
            {title.length > 15 ? title.slice(0, 13) + '...' : title}
          </div>
          <div
            className={styles.productPrice}
            style={{fontSize: price.length > 9 ? '18px' : '24px'}}
          >{price}</div>
          {!addedToCart ?
            <button
              className={styles.addToCart}
              onClick={e => handleAddToCart(e, id)}
              disabled={quantidade < 1}
            >
              <MdAddShoppingCart />
            </button>
            :
            <button
              className={styles.removeFromCart}
              onClick={e => handleRemoveToCart(e, id)}
              disabled={quantidade < 1}
            >
              <MdAddShoppingCart />
            </button>
          }
        </div>
      </Link>
    </div>
  );
}
