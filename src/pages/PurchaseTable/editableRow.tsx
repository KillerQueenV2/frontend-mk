import { useEffect, useState } from "react"
import { IProduct, IUser } from "../../global/interfaces"
import { ProductsRepository } from "../../repositories/Products"
import { UsersRepository } from "../../repositories/Users"

interface EditFormDataProps {
  nome: string;
  quantidade: string;
  rua: string;
  numero: string;
  cep: string;
  complemento: string;
  telefone: string;
  bairro: string;
  usuario_id: string;
  produto_id: string;
}

interface EditableRowProps {
  editFormData: EditFormDataProps
  handleEditFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void
  handleCancelClick(): void
  className?: string
}

export default function EditableRow({ editFormData, handleEditFormChange, handleCancelClick, className }: EditableRowProps) {
  const [token] = useState(localStorage.getItem('token'))
  const [usersRepository] = useState<UsersRepository>(new UsersRepository())
  const [productsRepository] = useState<ProductsRepository>(new ProductsRepository())
  const [users, setUsers] = useState<IUser[]>()
  const [products, setProducts] = useState<IProduct[]>()

  useEffect(() => {
    const getData = async () => {
      try {
        const users = token && await usersRepository.getAll(token)
        const products = await productsRepository.getAll()
        // @ts-ignore
        users?.length && setUsers(users)
        // @ts-ignore
        products.length && setProducts(products)
      } catch (e) {
        console.error('Erro ao trazer produtos cadastrados')
      }
    }

    getData()
  }, [token, usersRepository, productsRepository])

  return (
    <tr>
      <td>
        <input
          type='text'
          name='nome'
          required
          placeholder='Nome'
          value={editFormData.nome}
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <input
          type='text'
          name='quantidade'
          required
          placeholder='Quantidade'
          value={editFormData.quantidade}
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <input
          type='text'
          name='rua'
          placeholder='Rua'
          value={editFormData.rua}
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <input
          type='text'
          name='numero'
          placeholder='Numero'
          value={editFormData.numero}
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <input
          type='text'
          name='cep'
          placeholder='CEP'
          value={editFormData.cep}
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <input
          type='text'
          name='complemento'
          placeholder='Complemento'
          value={editFormData.complemento}
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <input
          type='text'
          name='telefone'
          placeholder='Telefone'
          value={editFormData.telefone}
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <input
          type='text'
          name='bairro'
          placeholder='Bairro'
          value={editFormData.bairro}
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <select
          name="usuario_id"
          value={editFormData.usuario_id}
          onChange={handleEditFormChange}
        >
          {users?.map(user => (
            <option value={user.id}>{user.nome}</option>
          ))}
        </select>
      </td>
      <td>
        <select
          name="produto_id"
          value={editFormData.produto_id}
          onChange={handleEditFormChange}
        >
          {products?.map(product => (
            <option value={product.id}>{product.nome}</option>
          ))}
        </select>
      </td>
      <td>
        <button type='submit'>Salvar</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  )
}