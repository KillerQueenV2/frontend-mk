import {useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {Range} from '../../components/common/range'
import {Header} from '../../components/sections/header'
import {Sidebar} from '../../components/sections/sidebar'
import {IProduct} from '../../global/interfaces'
import {ProductsContext} from '../../providers/products'
import {GlassMagnifier} from "react-image-magnifiers"
import styles from './styles.module.scss'

type ParamTypes = {
  id: string
}

const ProductDetails: React.FC = () => {
  const [buyProduct, setBuyProduct] = useState<boolean>(false)
  const [amountFieldValue, setAmountFieldValue] = useState<string>('1')
  const {activeProducts, setActiveProducts} = useContext(ProductsContext)
  const [product, setProduct] = useState<IProduct>()
  const {id} = useParams<ParamTypes>()

  useEffect(() => {
    const productById = activeProducts.find(product => String(product.id) === id)
    setProduct(productById)

    setAmountFieldValue(product?.quantidadeSelecionada ? String(product?.quantidadeSelecionada) : '1')
  }, [id, product?.quantidadeSelecionada, activeProducts])

  function handleAddToCart() {
    const amountsFieldValues = localStorage.getItem('amountsFieldValues')
    const storedProductsId = localStorage.getItem('storedProductsId')

    const amountsFieldValuesArray: string[] = amountsFieldValues ? amountsFieldValues && JSON.parse(amountsFieldValues) : []
    const storedProductsIdArray: string[] = storedProductsId ? storedProductsId && JSON.parse(storedProductsId) : []

    localStorage.setItem('storedProductsId', JSON.stringify([...storedProductsIdArray, id]))
    localStorage.setItem('amountsFieldValues', JSON.stringify([...amountsFieldValuesArray, Number(amountFieldValue)]))

    const addedProduct = {...product}
    addedProduct.quantidadeSelecionada = amountFieldValue
    addedProduct.addedToCart = true

    // @ts-ignore
    setProduct(addedProduct)

    const index = activeProducts.findIndex(product => String(product.id) === String(id))
    const addedProducts = [...activeProducts]

    // @ts-ignore
    addedProducts[index] = addedProduct
    setActiveProducts(addedProducts)
  }

  function handleRemoveToCart() {
    const amountsFieldValues = localStorage.getItem('amountsFieldValues')
    const storedProductsId = localStorage.getItem('storedProductsId')

    const amountsFieldValuesArray: string[] = amountsFieldValues ? amountsFieldValues && JSON.parse(amountsFieldValues) : []
    const storedProductsIdArray = storedProductsId ? storedProductsId && JSON.parse(storedProductsId) : []

    amountsFieldValuesArray.splice(storedProductsIdArray.indexOf(id), 1)
    storedProductsIdArray.splice(storedProductsIdArray.indexOf(id), 1)

    localStorage.setItem('amountsFieldValues', JSON.stringify(amountsFieldValuesArray))
    localStorage.setItem('storedProductsId', JSON.stringify(storedProductsIdArray))

    const {addedToCart, quantidadeSelecionada, ...removedFromCart} = {...product}

    // @ts-ignore
    setProduct(removedFromCart)

    const index = activeProducts.findIndex(product => String(product.id) === String(id))
    const addedProducts = [...activeProducts]

    // @ts-ignore
    addedProducts[index] = removedFromCart
    setActiveProducts(addedProducts)
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.displayImageContainer}>
            {product && <GlassMagnifier
              imageSrc={product?.imagem}
              imageAlt="product image"
              magnifierSize={150}
              allowOverflow
            />}
          </div>
          <div className={styles.productInformation}>
            <div className={styles.name}>
              <span>{product?.nome}</span>
            </div>
            <div className={styles.description}>
              <span>{product?.descricao}</span>
            </div>
            <div className={styles.price}>
              <span>{product?.preco}</span>
            </div>
            <div className={styles.amount}>
              <span>{product && product?.quantidade < 1 ? 'Indisponível' : `Disponível ${product?.quantidade}`}</span>
            </div>
            <div className={styles.buttonContainer}>
              {buyProduct && <Redirect to='/carrinho' />}
              <button
                onClick={() => {
                  setBuyProduct(true)
                  handleAddToCart()
                }}
                className={styles.buyNow}
                disabled={
                  Number(amountFieldValue) > Number(product?.quantidade) ||
                  Number(product?.quantidade) < 1
                }
              >
                Comprar agora
              </button>
              {product?.addedToCart
                ?
                <button
                  className={styles.removeFromCart}
                  onClick={handleRemoveToCart}
                >
                  Remover do carrinho
                </button>
                :
                <button
                  className={styles.addToCart}
                  onClick={handleAddToCart}
                  disabled={
                    Number(amountFieldValue) > Number(product?.quantidade) ||
                    Number(product?.quantidade) < 1
                  }
                >
                  Adicionar ao carrinho
                </button>}
            </div>
            <label htmlFor='quantidade'>Quantidade</label>
            <input
              placeholder='quantidade'
              disabled={
                Number(product?.quantidade) < 1 ||
                product?.addedToCart
              }
              onChange={e => {
                setAmountFieldValue(e.target.value)
              }}
              value={amountFieldValue}
              name='quantidade'
              type='number'
            />
          </div>
        </div>
      </div>
      <Range />
    </>
  )
}

export default ProductDetails
