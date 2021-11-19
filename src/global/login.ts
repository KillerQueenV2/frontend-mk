import BASE_URL from "./apiUrl"

export const login = async (email: string, password: string) => {
  console.log(`${BASE_URL}/login`)

  const send = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      senha: password
    })
  })
  const response = await send.json()
  return response
}
