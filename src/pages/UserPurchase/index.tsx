import styles from './styles.module.scss'

import { useEffect, useState } from "react"
import { Header } from "../../components/sections/header"
import { Main } from "../../components/sections/main"
import { Sidebar } from "../../components/sections/sidebar"
import BASE_URL from "../../global/apiUrl"
import { IPurchase } from "../../global/interfaces"
import { Range } from '../../components/common/range'

export default function UserPurchase() {
  const [userPurchases, setUserPurchases] = useState<IPurchase[]>()
  const [userId] = useState<string | null>(localStorage.getItem('userId'))
  const [token] = useState<string | null>(localStorage.getItem('token'))

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${BASE_URL}/Userpurchases/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      console.log(data)

      setUserPurchases(data)
    }

    getData()
  }, [userId, token])

  return (
    <>
      <Header />
      <Sidebar />
      <Main>
        {token ? <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome do produto</th>
                <th>Quantidade</th>
                <th>Rua</th>
                <th>Numero</th>
                <th>CEP</th>
                <th>Complemento</th>
                <th>Telefone</th>
                <th>Bairro</th>
              </tr>
            </thead>
            <tbody>
              {userPurchases?.map(userPurchase => (
                <>
                  <tr key={Number(userPurchase.id) * Math.random()}>
                    <td>{userPurchase.nome}</td>
                    <td>{userPurchase.quantidade}</td>
                    <td>{userPurchase.rua}</td>
                    <td>{userPurchase.numero}</td>
                    <td>{userPurchase.cep}</td>
                    <td>{userPurchase.complemento}</td>
                    <td>{userPurchase.telefone}</td>
                    <td>{userPurchase.bairro}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </> : <>
          <h1>Usuário não logado</h1>
        </>}
        <Range />
      </Main>

      {/* "nome": "teclado",
    "quantidade": "1",
    "rua": "odwko",
    "numero": "1209303",
    "cep": "12009310",
    "complemento": "",
    "telefone": "11111111111",
    "bairro": "dowkdow", */}
    </>
  )
}