import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import EditableRow from './editableRow'
import ReadOnlyRow from './readOnlyRow'

import { IProduct, ISupplier } from '../../global/interfaces'
import styles from './styles.module.scss'

import { removeEmpty } from '../../global/removeEmpty'
import { Sidebar } from '../../components/sections/sidebar'
import { Header } from '../../components/sections/header'
import { ProductsRepository } from '../../repositories/Products'
import { SuppliersRepository } from '../../repositories/Suppliers'
import { numberMask } from '../../global/masks'
import BASE_URL from '../../global/apiUrl'
import verifyUser from '../../global/verifyUser'

export default function ProductTable() {
  const [token] = useState(localStorage.getItem('token'))
  const [formData] = useState<FormData>(new FormData())
  
  const [suppliers, setSuppliers] = useState<ISupplier[]>([
    {
      id: '',
      nome: '',
      telefone: '',
      email: '',
      cnpj: '',
      status: ''
    }
  ])
  const [products, setProducts] = useState<IProduct[]>()
  
  const [productsRepository] = useState<ProductsRepository>(new ProductsRepository())
  const [suppliersRepository] = useState<SuppliersRepository>(new SuppliersRepository())

  const [addFormData, setAddFormData] = useState({
    nome: '',
    fornecedor_id: '1',
    imagem: '',
    descricao: '',
    quantidade: '',
    preco: ''
  })
  const [editFormData, setEditFormData] = useState({
    nome: '',
    fornecedor_id: '1',
    imagem: '',
    descricao: '',
    quantidade: '',
    preco: ''
  })
  const [editProductId, setProductId] = useState<string>()

  useEffect(() => {
    const getData = async () => {
      try {
        const data = token && await suppliersRepository.getAll(token)
        if (data?.length) {
          const addFormDataEdited = { ...addFormData }
          // @ts-ignore
          addFormDataEdited.fornecedor_id = data[0].id
          setAddFormData(addFormDataEdited)
          setEditFormData(addFormDataEdited)
          // @ts-ignore
          setSuppliers(data)
        }
      } catch (e) {
        console.error('Erro ao trazer produtos cadastrados')
      }
    }

    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, suppliersRepository])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = token && await productsRepository.getAll()
        console.log(data)
        // @ts-ignore
        data?.length && setProducts(data)
      } catch (e) {
        console.error('Erro ao trazer usuários cadastrados')
      }
    }

    getData()
  }, [token, productsRepository])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await verifyUser(token)
        if (data.type !== 'admin') {
          (window as any).location.href = '/'
        }
      } catch (e) {
        console.log(e)
      }
    }

    getData()
  }, [token])


  async function handleAddFormChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    event.preventDefault()

    const fieldNome: 'nome' | 'fornecedor_id' | 'imagem' | 'descricao' | 'quantidade' | 'preco'= (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...addFormData }
    newFormData[fieldNome] = fieldValue
    newFormData.quantidade = numberMask(newFormData.quantidade)

    setAddFormData(newFormData)
  }

  async function handleEditFormChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    event.preventDefault()

    const fieldNome: 'nome' | 'fornecedor_id' | 'imagem' | 'descricao' | 'quantidade' | 'preco'= (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldNome] = fieldValue
    
    setEditFormData(newFormData)
  }

  async function handleAddFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const imageElement = (event.target as any).imagem
    const [file] = imageElement.files
    formData.append('image', file)

    const response = await fetch(`${BASE_URL}/uploader`, {
      method: 'POST',
      body: formData
    })
    const data = await response.json()

    const newProduct = {
      nome: addFormData.nome,
      fornecedor_id: addFormData.fornecedor_id,
      imagem: data.link,
      preco: addFormData.preco,
      quantidade: Number(addFormData.quantidade),
      descricao: addFormData.descricao,
      status: '1',
      id: products ? String(products.length + 1) : String(0)
    }
    
    const newProducts = products && [...products, newProduct]
    setProducts(newProducts)

    const payload = {
      nome: newProduct.nome,
      imagem: newProduct.imagem,
      descricao: addFormData.descricao,
      quantidade: Number(addFormData.quantidade),
      preco: newProduct.preco,
      fornecedor_id: newProduct.fornecedor_id,
    }
    
    token && productsRepository.post(payload, token)
  }

  async function handleEditFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newproducts = products && [...products]
    const index = products?.findIndex((product: IProduct) => product.id === editProductId)
    
    const imageElement = (event.target as any).imagem
    const [file] = imageElement.files
    formData.append('image', file)

    const response = await fetch(`${BASE_URL}/uploader`, {
      method: 'POST',
      body: formData
    })
    const data = await response.json()

    const editedProduct = {
      id: editProductId,
      nome: editFormData.nome,
      fornecedor_id: editFormData.fornecedor_id,
      imagem: data.link,
      preco: editFormData.preco,
      quantidade: editFormData.quantidade,
      descricao: editFormData.descricao,
      // @ts-ignore
      status: products[index].status
    }

    // @ts-ignore
    newproducts[index] = editedProduct
    setProducts(newproducts)
    setProductId(undefined)

    const { id, ...product } = editedProduct
    let payload = {}

    for (const key in product) {
      // @ts-ignore
      payload[key] = product[key] === products[index][key] ? undefined : product[key] 
    }
    payload = removeEmpty(payload)

    token && productsRepository.patch(payload, String(id), token)
    window.location.reload()
  }

  function handleEditClick(event: any, product: IProduct) {
    event.preventDefault()
    setProductId(product.id)

    const formValues = {
      nome: product.nome,
      fornecedor_id: product.fornecedor_id,
      imagem: String(product.imagem),
      preco: product.preco,
      quantidade: String(product.quantidade),
      descricao: product.descricao
    }

    setEditFormData(formValues)
  }

  function handleCancelClick() {
    setProductId(undefined)
  }

  function handleInactiveClick(productId: string) {
    const index = products?.findIndex(product => product.id === productId)
    
    // @ts-ignore
    const editabledProduct = [...products]
    // @ts-ignore
    editabledProduct[index].status = '0'

    setProducts(editabledProduct)
    productsRepository.delete(productId, token)
  }

  function handleActiveClick(productId: string) {
    const index = products?.findIndex(product => product.id === productId)
    
    // @ts-ignore
    const editabledProduct = [...products]
    // @ts-ignore
    editabledProduct[index].status = '1'

    setProducts(editabledProduct)
    productsRepository.patch({ status: '1' }, productId, token)
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className={styles.container}>
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Fornecedor ID</th>
                <th>Imagem</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product: IProduct) => (
                <>
                  {editProductId === product.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      
                      handleCancelClick={handleCancelClick}
                      className={styles.editableInput}
                    />
                  ) : (
                    <ReadOnlyRow
                      product={product}
                      handleEditClick={handleEditClick}
                      handleInactiveClick={handleInactiveClick}
                      handleActiveClick={handleActiveClick}
                      
                      inactivateBtnStyle={styles.inactivateBtn}
                      activateBtnStyle={styles.activateBtn}
                      actionStyle={styles.action}
                    />
                  )}
                </>
              ))}
            </tbody>
          </table>
        </form>
        
        <div className={styles.registrationForm}>
          <h2>Adicionar produto</h2>
          <form onSubmit={handleAddFormSubmit}>
            <input
              type='text'
              name='nome'
              className={styles.inputRegistration}
              required
              placeholder='Nome'
              onChange={handleAddFormChange}
            />
            <select
              name="fornecedor_id"
              value={addFormData.fornecedor_id}
              required
              onChange={handleAddFormChange}
            >
              {suppliers?.map(supplier => (
                <option value={supplier.id}>{supplier.nome}</option>
              ))}
            </select>
            <input
              type='file'
              name='imagem'
              placeholder='Imagem'
              required
              onChange={handleAddFormChange}
            />
            <input
              type='text'
              name='descricao'
              className={styles.inputRegistration}
              required
              placeholder='Descrição'
              onChange={handleAddFormChange}
            /> 
            <input
              type='text'
              name='quantidade'
              value={addFormData.quantidade}
              className={styles.inputRegistration}
              required
              placeholder='Quantidade'
              onChange={handleAddFormChange}
            />
            <input
              type='text'
              name='preco'
              className={styles.inputRegistration}
              required
              placeholder='Preço'
              onChange={handleAddFormChange}
            />
            <button
              type='submit'
              className={styles.addBtn}
            >
              Adicionar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}