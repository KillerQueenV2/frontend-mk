export const numberMask = (value: string) => {
  return value
    .replace(/[^0-9]/g, '')
}

export const cpfMask = (value: string) => {
  return value
    .replace(/[^0-9]/g, '')
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export const cepMask = (value: string) => {
  return value
    .replace(/[^0-9]/g, '')
    .replace(/(\d{5})(\d{3})/, '$1-$2')
}

export const phoneMask = (value: string) => {
  return value
    .replace(/[^0-9]/g, '')
    .replace(/(\d{2})(\d{5})(\d{4})/, '$1 $2-$3')
}
