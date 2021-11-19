import styles from './styles.module.scss'

import {useEffect, useState} from "react"
import {AiOutlineMenu} from "react-icons/ai"
import {FiUserPlus, FiShoppingCart, FiCodesandbox} from 'react-icons/fi'
import { FaUserFriends, FaLuggageCart } from 'react-icons/fa'
import { BiCoinStack } from 'react-icons/bi'
import { BsFillInboxesFill } from 'react-icons/bs'
import { RiNotification2Fill } from 'react-icons/ri'
import {Link} from 'react-router-dom';
import BASE_URL from '../../../global/apiUrl'
import {ProfileButton} from '../../common/profileButton'

export function Sidebar() {
  const [userType, setUserType] = useState('')
  const [sidebarState, setsidebarState] = useState(false)
  const [userId, setUser] = useState('')

  useEffect(() => {
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('token')

    id && setUser(id)
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
  }, [])

  return (
    <>
      <div className={sidebarState ? styles.sidebarOpened : styles.sidebar}>
        <div className={styles.item} id={styles.burger} onClick={() => setsidebarState(!sidebarState)}>
          <AiOutlineMenu />
        </div>
        {userType === 'admin' ? <>
          <Link to="/admin/user-table">
            <div className={styles.item}>
              <FaUserFriends />
              <span>Usuários</span>
            </div>
          </Link>
          <Link to="/admin/product-table">
            <div className={styles.item}>
              <BsFillInboxesFill />
              <span>Produtos</span>
            </div>
          </Link>
          <Link to="/admin/supplier-table">
            <div className={styles.item}>
              <FaLuggageCart />
              <span>Fornecedores</span>
            </div>
          </Link>
          <Link to="/admin/purchase-table">
            <div className={styles.item}>
              <RiNotification2Fill />
              <span>Pedidos</span>
            </div>
          </Link>
        </> : <>
          <Link to="/">
            <div className={styles.item}>
              <FiCodesandbox />
              <span>Produtos</span>
            </div>
          </Link>
          <Link to={userId ? '/meus-pedidos' : '/signup'}>
            <div className={styles.item}>
              {userId ? <BiCoinStack /> : <FiUserPlus />}
              <span>{userId ? 'Compras' : 'Cadastrar-se'}</span>
            </div>
          </Link>
          <Link to="/carrinho">
            <div className={styles.item}>
              <FiShoppingCart />
              <span>Carrinho</span>
            </div>
          </Link>
        </>}
      </div>

      <ProfileButton
        sidebarState={sidebarState}
        userType={userType}
      />
    </>
  )
}
