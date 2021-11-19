import styles from './styles.module.scss'

import {useEffect, useContext, useState} from 'react'
import {ProductsContext} from '../../../providers/products'
import {Spinner} from '../../common/spinner'
import {Card} from '../../common/card'
import {SearchContext} from '../../../providers/saerch'
import {IProduct} from '../../../global/interfaces'

export function ProductList() {
  const {activeProducts, setActiveProducts, isLoaded} = useContext(ProductsContext)
  const [amountsFieldValues, setAmountsFieldValues] = useState<number[]>([])
  const [storedProductsId, setStoredProductsId] = useState<string[]>([])
  const {search} = useContext(SearchContext)

  const getContainerHeight = !isLoaded ? {height: '80vh'} : {}

  useEffect(() => {
    const amountsFieldValues = localStorage.getItem('amountsFieldValues')
    const storedProductsId = localStorage.getItem('storedProductsId')
    amountsFieldValues && setAmountsFieldValues(JSON.parse(amountsFieldValues))
    storedProductsId && setStoredProductsId(JSON.parse(storedProductsId))
  }, [])

  useEffect(() => {
    localStorage.setItem('storedProductsId', JSON.stringify(storedProductsId))
    localStorage.setItem('amountsFieldValues', JSON.stringify(amountsFieldValues))
  }, [storedProductsId, amountsFieldValues])

  const productsFound = (
    activeProducts?.filter((product: IProduct) => {
      const researched = product?.nome?.toLowerCase().includes(search)
      return researched && product
    })
  )

  function handleAddToCart(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) {
    event.preventDefault()

    const index = activeProducts.findIndex(product => product.id === id)
    const addedProducts = {...activeProducts[index]}
    addedProducts.addedToCart = true
    addedProducts.quantidadeSelecionada = '1'

    handleUpdateState(addedProducts, index)

    const selectedIds = [...storedProductsId]
    selectedIds.push(id)
    setStoredProductsId(selectedIds)

    const addedAmounts = [...amountsFieldValues, 1]
    setAmountsFieldValues(addedAmounts)
  }

  function handleRemoveToCart(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) {
    event.preventDefault()

    const index = activeProducts.findIndex(product => product.id === id)
    const addedProducts = {...activeProducts[index]}
    const {addedToCart, quantidadeSelecionada, ...removedFromCart} = addedProducts

    handleUpdateState(removedFromCart, index)

    const amountsValues = [...amountsFieldValues]
    const selectedIds = [...storedProductsId]

    amountsValues.splice(selectedIds.indexOf(id), 1)
    setAmountsFieldValues(amountsValues)

    selectedIds.splice(selectedIds.indexOf(id), 1)
    setStoredProductsId(selectedIds)
  }

  function handleUpdateState(product: IProduct, index: number) {
    const updatedProductsState = [...activeProducts]
    updatedProductsState[index] = product

    setActiveProducts(updatedProductsState)
  }

  return (
    <>
      <h1 className={styles.advertising}>
        {productsFound.length === activeProducts.length && activeProducts.length !== 0
          ? 'Confira os nossos produtos'
          : productsFound.length === 0
            ? 'Nenhum produto encontrado'
            : `Produtos encontrados: ${productsFound.length}`}
      </h1>
      <div className={styles.productList} style={getContainerHeight}>
        {!isLoaded && <Spinner />}
        {productsFound
          .map((product: IProduct, i: number) => (
            <div className={styles.cardContainer} key={i * Math.random()}>
              <Card
                image={product.imagem}
                title={product.nome}
                quantidade={product.quantidade}
                price={product.preco}
                id={product.id}

                handleAddToCart={handleAddToCart}
                handleRemoveToCart={handleRemoveToCart}
                addedToCart={product.addedToCart ? true : false}
              />
            </div>
          ))}
      </div>
    </>
  )
}
