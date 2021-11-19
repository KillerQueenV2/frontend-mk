import { IProduct } from "../../global/interfaces";

interface ReadOnlyRowProps {
  product: IProduct
  handleEditClick(event: any, user: IProduct): void
  handleInactiveClick(userId: string): void
  handleActiveClick(userId: string): void
  inactivateBtnStyle: string
  activateBtnStyle: string
  actionStyle: string
}

export default function ReadOnlyRow({ product, handleEditClick, handleInactiveClick, handleActiveClick, inactivateBtnStyle, activateBtnStyle, actionStyle }: ReadOnlyRowProps) {
  return (
    <tr key={product.id}>
      <td>{product.nome}</td>
      <td>{product.fornecedor_id}</td>
      <td>
        <img
          src={product.imagem} alt='product'
          width={100}
        />
      </td>
      <td>{product.descricao}</td>
      <td>{product.quantidade}</td>
      <td>{product.preco}</td>
      <td className={actionStyle}>
        <button
          type='button'
          onClick={(event) => handleEditClick(event, product)}
        >
          Editar
        </button>
        {Number(product.status) ?
          <button
            type='button'
            onClick={() => handleInactiveClick(product.id)}
            className={inactivateBtnStyle}
          >
            Inativar
          </button>
        : <button
            type='button'
            onClick={() => handleActiveClick(product.id)}
            className={activateBtnStyle}
          >
            Ativar
          </button>}
      </td>
    </tr>
  )
}