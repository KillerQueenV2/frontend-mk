import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import EditableRow from './editableRow'
import ReadOnlyRow from './readOnlyRow'

import { ISupplier } from '../../global/interfaces'
import styles from './styles.module.scss'

import { cpfMask } from '../../global/masks'
import { removeEmpty } from '../../global/removeEmpty'
import { Sidebar } from '../../components/sections/sidebar'
import { Header } from '../../components/sections/header'
import { SuppliersRepository } from '../../repositories/Suppliers'
import verifyUser from '../../global/verifyUser'

export default function SupplierTable() {
  const [token] = useState(localStorage.getItem('token'))
  const [suppliersRepository] = useState<SuppliersRepository>(new SuppliersRepository())

  const [suppliers, setSuppliers] = useState<ISupplier[]>()
  const [addFormData, setAddFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    cnpj: ''
  })
  const [editFormData, setEditFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    cnpj: ''
  })
  const [editsupplierId, setSupplierId] = useState<string>()

  useEffect(() => {
    const getData = async () => {
      try {
        const data = token && await suppliersRepository.getAll(token)
        // @ts-ignore
        data?.length && setSuppliers(data)
      } catch (e) {
        console.error('Erro ao trazer usuários cadastrados')
      }
    }

    getData()
  }, [token, suppliersRepository])

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

  function handleAddFormChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const fieldNome: 'nome' | 'telefone' | 'email' | 'cnpj'  = (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...addFormData }
    newFormData[fieldNome] = fieldValue

    console.log(newFormData)

    setAddFormData(newFormData)
  }

  function handleEditFormChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const fieldNome: 'nome' | 'telefone' | 'email' | 'cnpj'= (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldNome] = fieldValue
    
    setEditFormData(newFormData)
  }

  function handleAddFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newSupplier = {
      nome: addFormData.nome,
      telefone: addFormData.telefone,
      email: addFormData.email,
      cnpj: addFormData.cnpj,
      status: '1',
      id: suppliers ? String(suppliers.length + 1) : String(0)
    }

    const newSuppliers = suppliers && [...suppliers, newSupplier]
    setSuppliers(newSuppliers)

    const payload = {
      nome: newSupplier.nome,
      telefone: newSupplier.telefone,
      email: newSupplier.email,
      cnpj: newSupplier.cnpj
    }
    
    token && suppliersRepository.post(payload, token)
  }

  function handleEditFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newsuppliers = suppliers && [...suppliers]
    const index = suppliers?.findIndex((supplier: ISupplier) => supplier.id === editsupplierId)
    
    const editedSupplier = {
      id: editsupplierId,
      nome: editFormData.nome,
      telefone: editFormData.telefone,
      email: editFormData.email,
      cnpj: editFormData.cnpj,
      // @ts-ignore
      status: suppliers[index].status
    }

    // @ts-ignore
    newsuppliers[index] = editedSupplier
    setSuppliers(newsuppliers)
    setSupplierId(undefined)

    const { id, ...supplier } = editedSupplier
    let payload = {}

    for (const key in supplier) {
      // @ts-ignore
      payload[key] = supplier[key] === suppliers[index][key] ? undefined : supplier[key] 
    }
    payload = removeEmpty(payload)
    // @ts-ignore
    if (payload.cpf) {
      // @ts-ignore
      payload.cpf = cpfMask(payload.cpf)
    }
    suppliersRepository.patch(payload, String(id), token)
  }

  function handleEditClick(event: any, supplier: ISupplier) {
    event.preventDefault()
    setSupplierId(supplier.id)

    const formValues = {
      nome: supplier.nome,
      telefone: supplier.telefone,
      email: supplier.email,
      cnpj: supplier.cnpj
    }

    setEditFormData(formValues)
  }

  function handleCancelClick() {
    setSupplierId(undefined)
  }

  function handleInactiveClick(supplierId: string) {
    const index = suppliers?.findIndex(supplier => supplier.id === supplierId)
    
    // @ts-ignore
    const editabledSupplier = [...suppliers]
    // @ts-ignore
    editabledSupplier[index].status = '0'

    setSuppliers(editabledSupplier)
    suppliersRepository.delete(supplierId, token)
  }

  function handleActiveClick(supplierId: string) {
    const index = suppliers?.findIndex(supplier => supplier.id === supplierId)
    
    // @ts-ignore
    const editabledSupplier = [...suppliers]
    // @ts-ignore
    editabledSupplier[index].status = '1'

    setSuppliers(editabledSupplier)
    suppliersRepository.patch({ status: '1' }, supplierId, token)
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
                <th>Telefone</th>
                <th>Email</th>
                <th>CNPJ</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {suppliers?.map((supplier: ISupplier) => (
                <>
                  {editsupplierId === supplier.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      className={styles.editableInput}
                    />
                  ) : (
                    <ReadOnlyRow
                      supplier={supplier}
                      handleEditClick={handleEditClick}
                      handleInactiveClick={handleInactiveClick}
                      handleActiveClick={handleActiveClick}
                      inactivateBtnStyle={styles.inactivateBtn}
                      activateBtnStyle={styles.activateBtn}
                    />
                  )}
                </>
              ))}
            </tbody>
          </table>
        </form>
        
        <div className={styles.registrationForm}>
          <h2>Adicionar fornecedor</h2>
          <form onSubmit={handleAddFormSubmit}>
            <input
              type='text'
              name='nome'
              className={styles.inputRegistration}
              required
              placeholder='Nome'
              onChange={handleAddFormChange}
            /> 
            <input
              type='text'
              name='telefone'
              className={styles.inputRegistration}
              required
              placeholder='Telefone'
              maxLength={11}
              onChange={handleAddFormChange}
            /> 
            <input
              type='text'
              name='email'
              className={styles.inputRegistration}
              required
              placeholder='Email'
              onChange={handleAddFormChange}
            /> 
            <input
              type='text'
              name='cnpj'
              className={styles.inputRegistration}
              required
              maxLength={14}
              placeholder='CNPJ'
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