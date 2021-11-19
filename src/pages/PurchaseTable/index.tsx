import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import EditableRow from './editableRow'
import ReadOnlyRow from './readOnlyRow'

import { IPurchase } from '../../global/interfaces'
import styles from './styles.module.scss'

import { removeEmpty } from '../../global/removeEmpty'
import { Sidebar } from '../../components/sections/sidebar'
import { Header } from '../../components/sections/header'
import { PurchasesRepository } from '../../repositories/Purchases'
import verifyUser from '../../global/verifyUser'

export default function PurchaseTable() {
  const [token] = useState(localStorage.getItem('token'))
  const [purchasesRepository] = useState<PurchasesRepository>(new PurchasesRepository())
  const [purchases, setPurchases] = useState<IPurchase[]>()
  const [editFormData, setEditFormData] = useState({
    nome: '',
    quantidade: '',
    rua: '',
    numero: '',
    cep: '',
    complemento: '',
    telefone: '',
    bairro: '',
    usuario_id: '',
    produto_id: ''
  })
  const [editPurchaseId, setPurchaseId] = useState<string>()
  
  useEffect(() => {
    const getData = async () => {
      try {
        const data = token && await purchasesRepository.getAll(token)
        // @ts-ignore
        data?.length && setPurchases(data)
      } catch (e) {
        console.error('Erro ao trazer usuários cadastrados')
      }
    }

    getData()
  }, [token, purchasesRepository])

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

  async function handleEditFormChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    event.preventDefault()

    const fieldNome: 'nome' | 'quantidade' | 'rua' | 'numero' | 'cep' | 'complemento' | 'telefone' | 'bairro' | 'usuario_id' | 'produto_id' = (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldNome] = fieldValue

    setEditFormData(newFormData)
  }

  function handleEditFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newpurchases = purchases && [...purchases]
    const index = purchases?.findIndex((purchase: IPurchase) => purchase.id === editPurchaseId)
    
    const editedPurchase = {
      id: editPurchaseId,
      nome: editFormData.nome,
      quantidade: editFormData.quantidade,
      rua: editFormData.rua,
      numero: editFormData.numero,
      cep: editFormData.cep,
      complemento: editFormData.complemento,
      telefone: editFormData.telefone,
      bairro: editFormData.bairro,
      usuario_id: editFormData.usuario_id,
      produto_id: editFormData.produto_id,
      // @ts-ignore
      status: purchases[index].status
    }

    // @ts-ignore
    newpurchases[index] = editedPurchase
    setPurchases(newpurchases)
    setPurchaseId(undefined)

    const { id, ...purchase } = editedPurchase
    let payload = {}

    for (const key in purchase) {
      // @ts-ignore
      payload[key] = purchase[key] === purchases[index][key] ? undefined : purchase[key] 
    }
    payload = removeEmpty(payload)

    purchasesRepository.patch(payload, String(id), token)
  }

  function handleEditClick(event: any, purchase: IPurchase) {
    event.preventDefault()
    setPurchaseId(purchase.id)

    const formValues = {
      nome: purchase.nome,
      quantidade: purchase.quantidade,
      rua: purchase.rua,
      numero: String(purchase.numero),
      cep: purchase.cep,
      complemento: String(purchase.complemento),
      telefone: purchase.telefone,
      bairro: purchase.bairro,
      usuario_id: String(purchase.usuario_id),
      produto_id: purchase.produto_id,
    }

    setEditFormData(formValues)
  }

  function handleCancelClick() {
    setPurchaseId(undefined)
  }

  function handleInactiveClick(purchaseId: string) {
    const index = purchases?.findIndex(purchase => purchase.id === purchaseId)
    
    // @ts-ignore
    const editabledPurchase = [...purchases]
    // @ts-ignore
    editabledPurchase[index].status = '0'

    setPurchases(editabledPurchase)
    purchasesRepository.delete(purchaseId, token)
  }

  function handleActiveClick(purchaseId: string) {
    const index = purchases?.findIndex(purchase => purchase.id === purchaseId)
    
    // @ts-ignore
    const editabledPurchase = [...purchases]
    // @ts-ignore
    editabledPurchase[index].status = '1'

    setPurchases(editabledPurchase)
    purchasesRepository.patch({ status: '1' }, purchaseId, token)
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
                <th>Quantidade</th>
                <th>Rua</th>
                <th>Numero</th>
                <th>CEP</th>
                <th>Complemento</th>
                <th>Telefone</th>
                <th>Bairro</th>
                <th>Usuário ID</th>
                <th>Produto ID</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {purchases?.map((purchase: IPurchase) => (
                <>
                  {editPurchaseId === purchase.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      className={styles.editableInput}
                    />
                  ) : (
                    <ReadOnlyRow
                      purchase={purchase}
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
      </div>
    </>
  )
}