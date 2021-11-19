import BASE_URL from "./apiUrl"

const verifyUser = async (token: string | null) => {
  const response = await fetch(`${BASE_URL}/admin`, {
    method: 'POST',
    body: JSON.stringify({
      token: token
    })
  })
  const data = await response.json()
  return data
}

export default verifyUser