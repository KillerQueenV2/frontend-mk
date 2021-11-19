import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import EditableRow from './editableRow'
import ReadOnlyRow from './readOnlyRow'

import { IUser } from '../../global/interfaces'
import { UsersRepository } from '../../repositories/Users'
import styles from './styles.module.scss'

import { cpfMask } from '../../global/masks'
import { removeEmpty } from '../../global/removeEmpty'
import { Sidebar } from '../../components/sections/sidebar'
import { Header } from '../../components/sections/header'

export default function UserTable() {
  const [token] = useState(localStorage.getItem('token'))
  const [usersRepository] = useState<UsersRepository>(new UsersRepository())

  const [users, setUsers] = useState<IUser[]>()
  const [addFormData, setAddFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: ''
  })
  const [editFormData, setEditFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: ''
  })
  const [editUserId, setUserId] = useState<string>()

  useEffect(() => {
    const getData = async () => {
      try {
        const data = token && await usersRepository.getAll(token)
        data && setUsers(data)
      } catch (e) {
        console.error('Erro ao trazer usuários cadastrados')
      }
    }

    getData()
  }, [token, usersRepository])

  function handleAddFormChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const fieldNome: 'nome' | 'email' | 'cpf' | 'senha'  = (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...addFormData }
    newFormData[fieldNome] = fieldValue
    newFormData.cpf = cpfMask(newFormData.cpf)

    setAddFormData(newFormData)
  }

  function handleEditFormChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const fieldNome: 'nome' | 'email' | 'cpf' | 'senha' = (event as any).target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldNome] = fieldValue
    
    setEditFormData(newFormData)
  }

  function handleAddFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newUser = {
      nome: addFormData.nome,
      email: addFormData.email,
      cpf: addFormData.cpf,
      senha: addFormData.senha,
      status: '1',
      id: users ? String(users.length + 1) : String(0)
    }

    const newUsers = users && [...users, newUser]
    setUsers(newUsers)

    const payload = {
      nome: newUser.nome,
      cpf: newUser.cpf,
      email: newUser.email,
      senha: newUser.senha,
    }
    
    payload.cpf = cpfMask(payload.cpf)
    usersRepository.post(payload)
  }

  function handleEditFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newUsers = users && [...users]
    const index = users?.findIndex((user: IUser) => user.id === editUserId)
    
    const editedUser = {
      id: editUserId,
      nome: editFormData.nome,
      email: editFormData.email,
      cpf: editFormData.cpf,
      senha: editFormData.senha,
      // @ts-ignore
      status: users[index].status
    }

    // @ts-ignore
    newUsers[index] = editedUser
    setUsers(newUsers)
    setUserId(undefined)
    
    const { id, ...user } = editedUser
    let payload = {}

    for (const key in user) {
      // @ts-ignore
      payload[key] = user[key] === users[index][key] ? undefined : user[key] 
    }
    payload = removeEmpty(payload)
    // @ts-ignore
    if (payload.cpf) {
      // @ts-ignore
      payload.cpf = cpfMask(payload.cpf)
    }
    usersRepository.patch(payload, String(id), token)
  }

  function handleEditClick(event: any, user: IUser) {
    event.preventDefault()
    setUserId(user.id)

    const formValues = {
      nome: user.nome,
      email: user.email,
      cpf: user.cpf,
      senha: user.senha,
    }

    setEditFormData(formValues)
  }

  function handleCancelClick() {
    setUserId(undefined)
  }

  function handleInactiveClick(userId: string) {
    const index = users?.findIndex(user => user.id === userId)
    
    // @ts-ignore
    const editabledUser = [...users]
    // @ts-ignore
    editabledUser[index].status = '0'

    setUsers(editabledUser)
    usersRepository.delete(userId, token)
  }

  function handleActiveClick(userId: string) {
    const index = users?.findIndex(user => user.id === userId)
    
    // @ts-ignore
    const editabledUser = [...users]
    // @ts-ignore
    editabledUser[index].status = '1'

    setUsers(editabledUser)
    usersRepository.patch({ status: '1' }, userId, token)
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
                <th>Email</th>
                <th>CPF</th>
                <th>senha</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: IUser) => (
                <>
                  {editUserId === user.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      className={styles.editableInput}
                    />
                  ) : (
                    <ReadOnlyRow
                      user={user}
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
          <h2>Adicionar usuário</h2>
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
              name='email'
              className={styles.inputRegistration}
              required
              placeholder='Email'
              onChange={handleAddFormChange}
            /> 
            <input
              type='text'
              name='cpf'
              className={styles.inputRegistration}
              required
              placeholder='CPF'
              maxLength={11}
              onChange={handleAddFormChange}
            /> 
            <input
              type='password'
              name='senha'
              className={styles.inputRegistration}
              required
              placeholder='senha'
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