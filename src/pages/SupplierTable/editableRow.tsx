interface EditFormDataProps {
  nome: string
  telefone: string
  email: string
  cnpj: string
}

interface EditableRowProps {
  editFormData: EditFormDataProps
  handleEditFormChange(event: React.ChangeEvent<HTMLInputElement>): void
  handleCancelClick(): void
  className?: string
}

export default function EditableRow({ editFormData, handleEditFormChange, handleCancelClick, className }: EditableRowProps) {
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
          name='telefone'
          placeholder='Telefone'
          maxLength={11}
          value={editFormData.telefone}
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <input
          type='text'
          name='email'
          placeholder='Email'
          value={editFormData.email}
          onChange={handleEditFormChange}
          className={className}
        />
      </td>
      <td>
        <input
          type='text'
          name='cnpj'
          placeholder='CNPJ'
          value={editFormData.cnpj}
          maxLength={14}
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