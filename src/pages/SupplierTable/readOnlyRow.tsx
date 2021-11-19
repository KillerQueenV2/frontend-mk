import { formatCnpj, formatFone } from "../../global/formatters";
import { ISupplier } from "../../global/interfaces";

interface ReadOnlyRowProps {
  supplier: ISupplier
  handleEditClick(event: any, user: ISupplier): void
  handleInactiveClick(userId: string): void
  handleActiveClick(userId: string): void
  inactivateBtnStyle: string
  activateBtnStyle: string
}

export default function ReadOnlyRow({ supplier, handleEditClick, handleInactiveClick, handleActiveClick, inactivateBtnStyle, activateBtnStyle }: ReadOnlyRowProps) {
  return (
    <tr key={supplier.id}>
      <td>{supplier.nome}</td>
      <td>{formatFone(supplier.telefone)}</td>
      <td>{supplier.email}</td>
      <td>{formatCnpj(supplier.cnpj)}</td>
      <td>
        <button
          type='button'
          onClick={(event) => handleEditClick(event, supplier)}
        >
          Editar
        </button>
        {Number(supplier.status) ?
          <button
            type='button'
            onClick={() => handleInactiveClick(supplier.id)}
            className={inactivateBtnStyle}
          >
            Inativar
          </button>
        : <button
            type='button'
            onClick={() => handleActiveClick(supplier.id)}
            className={activateBtnStyle}
          >
            Ativar
          </button>}
      </td>
    </tr>
  )
}