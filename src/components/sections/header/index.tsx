import styles from './styles.module.scss'
import InputSearch from '../../common/inputSearch'

export function Header() {
  const path = window.location.pathname

  return (
    <header>
      <div className={styles.logo}>
        M
      </div>
      {path === '/' && <InputSearch />}
    </header>
  )
}