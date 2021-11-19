export interface IProduct {
  id: string
  nome: string
  fornecedor_id: string
  imagem: string
  preco: string
  quantidade: number
  descricao: string
  addedToCart?: boolean
  quantidadeSelecionada?: string
  status?: string
}

export interface ILogin {
  user: string
  password: string
}

export interface IUser {
  id: string
  nome: string
  email: string
  cpf: string
  senha: string
  status?: string
}

export interface ISupplier {
  id: string,
  nome: string,
  telefone: string,
  email: string,
  cnpj: string,
  status?: string
}

export interface IPurchase {
  id: string
  nome: any
  quantidade: string
  produto_id: string
  usuario_id: string | null
  rua: string
  cep: string
  bairro: string
  numero: number
  complemento?: string | undefined
  status?: string
  telefone: string
}
export interface ILogin {
  email: string
  password: string
}

export interface ISignup extends ILogin {
  email: string
  cpf: string
}