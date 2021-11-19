import {Button} from '../../components/common/button'
import {Input} from '../../components/common/input'
import {Range} from '../../components/common/range'

import styles from './styles.module.scss'
import 'react-toastify/dist/ReactToastify.css'

import { Link } from 'react-router-dom'
import { Form } from '@unform/web'
import { ToastContainer } from 'react-toastify'
import { useRef } from 'react'
import { FormHandles } from '@unform/core'
import { errorMessage } from '../../global/toast'
import { login } from '../../global/login'

interface FormDataProps {
  email: string
  password: string
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  // const [loggedUser, setLoggedUser] = useState<boolean>(false)

  async function handleSubmit(data: FormDataProps) {
    try {
      const response = await login(data.email, data.password)
      const {token, usuario_id} = await response
      localStorage.setItem('token', token)
      localStorage.setItem('userId', usuario_id)
      if (localStorage.getItem('userAcessCart')) {
        (window as any).location.href = '/carrinho'
      } else {
        (window as any).location.href = '/'
      }
    } catch (e) {
      errorMessage('Usuário ou senha invalidos.')
    }
  }

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <span>M</span>
        </div>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            type='email'
            name='email'
            placeholder='Email'
            required
          />
          <Input
            type='password'
            name='password'
            placeholder='Senha'
            required
          />
          <Link to='/signup'>Cadastrar-se</Link>
          <Button type='submit' name='Entrar' />
        </Form>
      </div>
      <Range />
    </>
  )
}

export default Login
