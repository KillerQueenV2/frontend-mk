import { IUser } from "../../global/interfaces";
import { cpfMask } from "../../global/masks";

interface ReadOnlyRowProps {
  user: IUser
  handleEditClick(event: any, user: IUser): void
  handleInactiveClick(userId: string): void
  handleActiveClick(userId: string): void
  inactivateBtnStyle: string
  activateBtnStyle: string
}

export default function ReadOnlyRow({ user, handleEditClick, handleInactiveClick, handleActiveClick, inactivateBtnStyle, activateBtnStyle }: ReadOnlyRowProps) {
  return (
    <tr key={user.id}>
      <td>{user.nome}</td>
      <td>{user.email}</td>
      <td>{user.cpf.length === 11 ? cpfMask(user.cpf) : user.cpf}</td>
      <td>**************</td>
      <td>
        <button
          type='button'
          onClick={(event) => handleEditClick(event, user)}
        >
          Editar
        </button>
        {Number(user.status) ?
          <button
            type='button'
            onClick={() => handleInactiveClick(user.id)}
            className={inactivateBtnStyle}
          >
            Inativar
          </button>
        : <button
            type='button'
            onClick={() => handleActiveClick(user.id)}
            className={activateBtnStyle}
          >
            Ativar
          </button>}
      </td>
    </tr>
  )
}