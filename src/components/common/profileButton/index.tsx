import styles from './styles.module.scss'

import { AiOutlineLogin } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from 'react-icons/fa'

interface PropsMessage {
  sidebarState: boolean
  userType: string
}

export function ProfileButton(props: PropsMessage) {
  return (
    <Link to={props.userType ? `/config-account` : '/login'}>
      <div
        className={styles.container}
        style={{
          width: props.sidebarState ? '220px' : '80px',
          background: props.userType === 'admin' ? '#ff6348' : '#5352ed'
        }}
      >
        <button className={styles.button}>
          {props.userType ? <FaRegUserCircle /> : <AiOutlineLogin />}
          <span>{props.userType ? 'Meu perfil' : 'Fazer login'}</span>
        </button>
      </div>
    </Link>
  )
}