import { useEffect, useState } from "react"
import { ISupplier } from "../../global/interfaces"
import { SuppliersRepository } from "../../repositories/Suppliers"

interface EditFormDataProps {
  nome: string
  fornecedor_id: string
  imagem: string
  descricao: string
  quantidade: string
  preco: string
}

interface EditableRowProps {
  editFormData: EditFormDataProps
  handleEditFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void
  handleCancelClick(): void
  className?: string
}

export default function EditableRow({ editFormData, handleEditFormChange, handleCancelClick, className }: EditableRowProps) {
  const [token] = useState(localStorage.getItem('token'))
  const [suppliersRepository] = useState<SuppliersRepository>(new SuppliersRepository())
  const [suppliers, setSuppliers] = useState<ISupplier[]>()

  useEffect(() => {
    const getData = async () => {
      try {
        const data = token && await suppliersRepository.getAll(token)
        data && setSuppliers(data)
      } catch (e) {
        console.error('Erro ao trazer produtos cadastrados')
      }
    }

    getData()
  }, [token, suppliersRepository])

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
        <select
          name="fornecedor_id"
          value={editFormData.fornecedor_id}
          onChange={handleEditFormChange}
        >
          {suppliers?.map(supplier => (
            <option value={supplier.id}>{supplier.nome}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          type='file'
          name='imagem'
          placeholder='Imagem'
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <input
          type='text'
          name='descricao'
          placeholder='Descrição'
          value={editFormData.descricao}
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <input
          type='text'
          name='quantidade'
          placeholder='Quantidade'
          value={editFormData.quantidade}
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <input
          type='text'
          name='preco'
          placeholder='Preço'
          value={editFormData.preco}
          onChange={handleEditFormChange}
          className={className}
        />
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