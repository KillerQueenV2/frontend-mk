export function cpfValidator(data: string) {
  const regex = /^\d{3}.\d{3}.\d{3}-\d{2}$/
  return regex.test(data)
}

export function cepValidator(data: string) {
  const regex = /^\d{5}-\d{3}$/
  return regex.test(data)
}

export function telefoneValidator(data: string) {
  const regex = /^\d{2} \d{5}-\d{4}$/
  return regex.test(data)
}

export function emailValidator(data: string) {
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return regex.test(data)
}
