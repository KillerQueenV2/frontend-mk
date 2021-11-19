import {Form} from '@unform/web'

import {useState} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {ToastContainer} from 'react-toastify'
import {Button} from '../../components/common/button'
import {Input} from '../../components/common/input'
import {Range} from '../../components/common/range'
import {cepMask, phoneMask} from '../../global/masks'
import {errorMessage} from '../../global/toast'
import {cepValidator, telefoneValidator} from '../../global/validators'
import {ProductsRepository} from '../../repositories/Products'
import {PurchasesRepository} from '../../repositories/Purchases'
import styles from './styles.module.scss'

interface FormDataProps {
  rua: string
  cep: string
  bairro: string
  numero: number
  complemento?: string
  telefone: string
}

const CompletePurchase = () => {
  const [storedProductsId] = useState(localStorage.getItem('storedProductsId'))
  const [amountsFieldValues] = useState(localStorage.getItem('amountsFieldValues'))
  const [userId] = useState(localStorage.getItem('userId'))
  const [token] = useState(localStorage.getItem('token'))

  function showMessageSucessPurchase() {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
      title: 'Pedido realizado',
      text: 'Parabéns pela compra!',
      icon: 'success',
      confirmButtonText: 'Continuar comprando',
    }).then(() => {
      localStorage.removeItem('amountsFieldValues');
      localStorage.removeItem('storedProductsId');
      (window as any).location.href = '/'
    })
  }

  function handleSubmit(data: FormDataProps) {
    const storedProductsIdArray: string[] = storedProductsId && JSON.parse(storedProductsId)
    const amountsFieldValuesArray: number[] = amountsFieldValues && JSON.parse(amountsFieldValues)

    const validators = cepValidator(data.cep) && telefoneValidator(data.telefone)

    if (!validators) {
      errorMessage('Dados inválidos')
    } else {
      data.cep = data.cep.replace(/[^0-9]/g, '')
      data.telefone = data.telefone.replace(/[^0-9]/g, '');

      storedProductsIdArray.forEach(async (productId: string, i: number) => {
        const productRepository = new ProductsRepository()
        const purchaseRepository = new PurchasesRepository()

        const product = await productRepository.getById(productId)
        const payload = {
          ...data,
          nome: product.nome,
          quantidade: String(amountsFieldValuesArray[i]),
          produto_id: productId,
          usuario_id: userId
        }

        token && purchaseRepository.post(payload, token)
      })

      showMessageSucessPurchase()
    }
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Form
        onSubmit={handleSubmit}
        className={styles.formContainer}
      >
        <div className={styles.title}>
          <span>Preencha suas informações</span>
        </div>
        <div className={styles.ruaField}>
          <Input
            className={styles.customInput}
            name='rua'
            placeholder='Rua ou avenida'
            required
          />
        </div>
        <div className={styles.cepField}>
          <Input
            className={styles.customInput}
            name='cep'
            placeholder='CEP'
            maxLength={9}
            onChange={(event) => {
              const {value} = event.target
              event.target.value = cepMask(value)
            }}
            required
          />
        </div>
        <div className={styles.bairroField}>
          <Input
            className={styles.customInput}
            name='bairro'
            placeholder='Bairro'
            required
          />
        </div>
        <div className={styles.numeroField}>
          <Input
            className={styles.customInput}
            name='numero'
            maxLength={7}
            placeholder='Numero'
            onChange={(event) => {
              const {value} = event.target
              event.target.value = value.replace(/[^0-9]/, '')
            }}
            required
          />
        </div>
        <div className={styles.complementoField}>
          <Input
            className={styles.customInput}
            name='complemento'
            placeholder='Complemento (opcional)'
          />
        </div>
        <div className={styles.telefoneField}>
          <Input
            className={styles.customInput}
            name='telefone'
            maxLength={13}
            placeholder='Telefone'
            onChange={(event) => {
              const {value} = event.target
              event.target.value = phoneMask(value)
            }}
            required
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            name='Finalizar compra'
            type='submit'
          />
          {/* <Button
            className={styles.btn}
            name='Baixar boleto'
            type='button'
          /> */}
        </div>
      </Form>

      <Range />
    </div>
  )
}

export default CompletePurchase
