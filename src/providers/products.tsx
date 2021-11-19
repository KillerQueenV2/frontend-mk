import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { IProduct } from '../global/interfaces'
import { ProductsRepository } from '../repositories/Products'

export type ProductsContextType = {
  activeProducts: IProduct[]
  setActiveProducts: Dispatch<SetStateAction<IProduct[]>>
  inactiveProducts: IProduct[]
  setInactiveProducts: Dispatch<SetStateAction<IProduct[]>>
  isLoaded: boolean
}

export const ProductsContext = React.createContext<ProductsContextType>({
  activeProducts: [],
  setActiveProducts: text => console.warn('no Product text'),
  inactiveProducts: [],
  setInactiveProducts: text => console.warn('no Product text'),
  isLoaded: false
})

export const ProductsProvider: React.FC = ({ children }) => {
  const [activeProducts, setActiveProducts] = useState<IProduct[]>([])
  const [inactiveProducts, setInactiveProducts] = useState<IProduct[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function fetchProductsData() {
      try {
        const productsRepository = new ProductsRepository()
        const data = await productsRepository.getAll()
        const amountsFieldValues = localStorage.getItem('amountsFieldValues')
        const storedProductsId = localStorage.getItem('storedProductsId')
        const storedProductsIdArray = storedProductsId && JSON.parse(storedProductsId)

        data.forEach((product: IProduct, i: number) => {
          if (storedProductsIdArray?.includes(product.id)) {
            const addedProduct = { ...product }
            if (amountsFieldValues) {
              const amountsFieldValuesArray = JSON.parse(amountsFieldValues)
              addedProduct.quantidadeSelecionada = amountsFieldValuesArray[i]
            }
            addedProduct.addedToCart = true
            data[i] = addedProduct
          } else {
            const { addedToCart, quantidadeSelecionada, ...removedFromCart } = product
            data[i] = removedFromCart
          }
        })

        const activeProducts = data.filter(product => product.status === '1')
        const inactiveProducts = data.filter(product => product.status === '0')

        setActiveProducts(activeProducts)
        setInactiveProducts(inactiveProducts)
        setIsLoaded(true)
      } catch(e) {
        console.error(e)
      }
    }

    fetchProductsData()
  }, [])
  
  return (
    <ProductsContext.Provider value={{activeProducts, setActiveProducts, inactiveProducts, setInactiveProducts, isLoaded}}>
      {children}
    </ProductsContext.Provider>
  )
}