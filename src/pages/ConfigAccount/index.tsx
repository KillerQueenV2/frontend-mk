import styles from './styles.module.scss'
import 'react-toastify/dist/ReactToastify.css'
import {Button} from '../../components/common/button'
import {Range} from '../../components/common/range'
import {Input} from '../../components/common/input'
import {Form} from '@unform/web'
import {cpfMask} from '../../global/masks'
import {useEffect, useState} from 'react'
import {UsersRepository} from '../../repositories/Users'
import BASE_URL from '../../global/apiUrl'
import {IUser} from '../../global/interfaces'
import {ToastContainer} from 'react-toastify'
import {cpfValidator, emailValidator} from '../../global/validators'
import {errorMessage, successMessage} from '../../global/toast'
import {login} from '../../global/login'

interface FormDataProps {
  nome: string
  email: string
  cpf: string
  currentPassowrd: string
  senha: string
}

const ConfigAccount = () => {
  const [userType, setUserType] = useState('')
  const [userId] = useState(localStorage.getItem('userId'))
  const [token] = useState(localStorage.getItem('token'))

  const [initialData, setInitialData] = useState({
    nome: '',
    email: '',
    cpf: '',
    currentPassowrd: ''
  })

  useEffect(() => {
    fetch(`${BASE_URL}/consultuser/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        const {id, senha, status, ...initialData} = data
        setInitialData(initialData)
      })

    token && fetch(`${BASE_URL}/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    })
      .then(response => response.json())
      .then(({type}) => setUserType(type))
  }, [userId, token])

  async function handleSubmit(data: FormDataProps) {
    const validator = emailValidator(data.email) && cpfValidator(data.cpf)
    if (!validator) {
      errorMessage('Dados inválidos.')
    } else {
      const payload: FormDataProps | any = {}
      const {id, status, currentPassowrd, ...userData} = (data as any)
      for (const key in userData) {
        if (userData[key] && key) {
          payload[key] = userData[key]
        }
      }

      const {senha, email} = userData

      try {
        const auth = await login(initialData.email, currentPassowrd)

        if (userId && token && auth.token === token) {
          const userRepository = new UsersRepository()
          await userRepository.patch((payload as IUser), userId, token)
          const newAuth = await login(email, senha || currentPassowrd)
          localStorage.setItem('token', newAuth.token)
          successMessage('Dados salvos com sucesso!')
        } else {
          throw new Error('Erro ao salvar informações.')
        }
      } catch (e) {
        errorMessage('Erro ao salvar dados.')
      }
    }
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Form initialData={initialData} onSubmit={handleSubmit} className={styles.card}>
        <h2>Informações da sua conta</h2>
        <Input
          className={styles.customInput}
          type='text'
          name='nome'
          placeholder='Nome'
        />
        <Input
          className={userType === 'admin' ? styles.customInputDisabled : styles.customInput}
          type='email'
          name='email'
          disabled={userType === 'admin'}
          placeholder='Email'
          required
        />
        <Input
          className={styles.customInput}
          type='text'
          name='cpf'
          placeholder='CPF'
          onChange={(event) => {
            const {value} = event.target
            event.target.value = cpfMask(value)
          }}
          maxLength={14}
        />
        <Input
          className={styles.customInput}
          type='password'
          name='currentPassowrd'
          placeholder='Senha atual'
          required
        />
        <Input
          className={styles.customInput}
          type='password'
          name='senha'
          placeholder='Nova senha'
        />
        <br />
        <Button
          className={styles.save}
          type='submit'
          name='Salvar'
        />
        <br />
        <Button
          className={styles.logoutbtn}
          type='button'
          onClick={() => {
            localStorage.clear();
            (window as any).location.href = '/'
          }}
          name='Logout'
        />
      </Form>
      <Range />
    </div>
  )
}

export default ConfigAccount
