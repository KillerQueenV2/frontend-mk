import {useContext} from 'react'
import styles from './styles.module.scss'

import {SearchContext} from '../../../providers/saerch'

function InputSearch() {
  const {search, setSearch} = useContext(SearchContext)

  return (
    <input
      className={styles.container}
      type='text'
      placeholder='Pesquisar produto'
      value={search}
      onChange={event => setSearch(event.target.value)}
    />
  )
}

export default InputSearch
