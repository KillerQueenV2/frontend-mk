import styles from './styles.module.scss'

import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram
} from 'react-icons/ai'

export function Footer() {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.socialNetworks}>
          <AiFillFacebook />
          <AiFillTwitterSquare />
          <AiFillInstagram />
        </div>
        <div className={styles.footerMessage}>
          Acompanhe as nossas redes sociais
        </div>
        <div className={styles.diviser} />
        M
        <div className={styles.copyright}>
          COPYRIGHT © 2021 MK INFO.<br />TODOS OS DIREITOS RESERVADOS.
        </div>
      </div>
    </footer>
  )
}