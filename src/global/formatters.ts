export const formatCpf = (data: string) => {
  const formattedData = data.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  return formattedData
}

export const formatCnpj = (data: string) => {
  const formattedData = data.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
  return formattedData
}

export const formatFone = (data: string) => {
  const formattedData = data.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  return formattedData
}