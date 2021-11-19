import styles from './styles.module.scss'
import 'react-toastify/dist/ReactToastify.css'

import {Button} from '../../components/common/button'
import {Input} from '../../components/common/input'
import {Range} from '../../components/common/range'
import {Link, Redirect} from 'react-router-dom'
import {Form} from '@unform/web'
import {UsersRepository} from '../../repositories/Users'
import {ToastContainer} from 'react-toastify'
import {useState} from 'react'
import {emailExpression} from '../../global/regularExpressions'
import {cpfMask} from '../../global/masks'
import {cpfValidator, emailValidator} from '../../global/validators'
import {errorMessage} from '../../global/toast'

interface FormDataProps {
  nome: string
  cpf: string
  email: string
  senha: string
}

export default function Signup() {
  const [userRegistred, setUserRegistred] = useState<boolean>(false)

  async function handleSubmit(data: FormDataProps) {
    const validator = cpfValidator(data.cpf) && emailValidator(data.email)

    if (!validator) {
      errorMessage('Dados inválidos.')
    } else {
      const userRepository = new UsersRepository()
      const payload = {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        senha: data.senha
      }
      try {
        if (!emailExpression.test(payload.email)) {
          const message = 'Erro na formatação dos dados'
          throw message
        }
        userRepository.post(payload)
        setUserRegistred(true)
      } catch (e) {
        errorMessage('Erro ao cadastrar usuário.')
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        <ToastContainer />
        <div className={styles.logoContainer}>
          <span>M</span>
        </div>
        <Form onSubmit={handleSubmit}>
          <Input
            type='text'
            name='nome'
            placeholder='Usuário'
          />
          <Input
            type='email'
            name='email'
            placeholder='Email'
          />
          <Input
            type='text'
            name='cpf'
            onChange={(event) => {
              const {value} = event.target
              event.target.value = cpfMask(value)
            }}
            placeholder='CPF'
            maxLength={14}
          />
          <Input
            type='password'
            name='senha'
            placeholder='Senha'
          />
          <Link to='/login'>Fazer login</Link>
          <Button type='submit' name='Cadastrar-se' />
        </Form>
      </div>
      <Range />
      {userRegistred && <Redirect to='/login' />}
    </>
  )
}
