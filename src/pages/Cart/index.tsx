import styles from './styles.module.scss'
import {Button} from '../../components/common/button'
import {Link} from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'
import {IProduct} from '../../global/interfaces'
import {ProductsContext} from '../../providers/products'
import {Range} from '../../components/common/range'

export default function Carrinho() {
  const {activeProducts} = useContext(ProductsContext)
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>()

  useEffect(() => {
    const storedProductsId = localStorage.getItem('storedProductsId')
    const storedProductsIdArray: string[] = storedProductsId ? JSON.parse(storedProductsId) : []

    const selectedProducts = activeProducts.filter(product => {
      return storedProductsIdArray.includes(product.id)
    }, [])

    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userAcessCart', 'true')
    }

    setSelectedProducts(selectedProducts)
  }, [activeProducts])

  return (
    <div className={styles.container}>
      {selectedProducts?.length ?
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descricao</th>
                <th>Quantidade</th>
                <th>Preco</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts?.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.nome}</td>
                  <td>{product.descricao}</td>
                  <td>{product.quantidadeSelecionada ? product.quantidadeSelecionada : 1}</td>
                  <td>{product.preco}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to={localStorage.getItem('userId') ? '/carrinho/finalizar-compra' : '/login'}>
            <Button type='button' name='Confirmar compra' />
          </Link>
        </div> : <h1>Nenhum produto adicionado ao carrinho</h1>}
      {selectedProducts?.length !== 0 && <Range />}
    </div>
  )
}
