import { IPurchase } from "../../global/interfaces";

interface ReadOnlyRowProps {
  purchase: IPurchase
  handleEditClick(event: any, user: IPurchase): void
  handleInactiveClick(userId: string): void
  handleActiveClick(userId: string): void
  inactivateBtnStyle: string
  activateBtnStyle: string
}

export default function ReadOnlyRow({ purchase, handleEditClick, handleInactiveClick, handleActiveClick, inactivateBtnStyle, activateBtnStyle }: ReadOnlyRowProps) {
  return (
    <tr key={purchase.id}>
      <td>{purchase.nome}</td>
      <td>{purchase.quantidade}</td>
      <td>{purchase.rua}</td>
      <td>{purchase.numero}</td>
      <td>{purchase.cep}</td>
      <td>{purchase.complemento}</td>
      <td>{purchase.telefone}</td>
      <td>{purchase.bairro}</td>
      <td>{purchase.usuario_id}</td>
      <td>{purchase.produto_id}</td>
      <td>
        <button
          type='button'
          onClick={(event) => handleEditClick(event, purchase)}
        >
          Editar
        </button>
        {Number(purchase.status) ?
          <button
            type='button'
            onClick={() => handleInactiveClick(purchase.id)}
            className={inactivateBtnStyle}
          >
            Inativar
          </button>
        : <button
            type='button'
            onClick={() => handleActiveClick(purchase.id)}
            className={activateBtnStyle}
          >
            Ativar
          </button>}
      </td>
    </tr>
  )
}