import { IProduct } from "../global/interfaces"
import BASE_URL from "../global/apiUrl"

export class ProductsRepository {
  private API = `${BASE_URL}/produtos`

  public async getAll (): Promise<IProduct[]> {
    const response = await fetch(this.API)
    const data = await response.json()
    return data
  }

  public async getById (id: string): Promise<any> {
    const response = await fetch(`${this.API}/${id}`)
    const data = await response.json()
    return data
  }

  public async post (payload: Omit<IProduct, 'id'>, token: string): Promise<any> {
    const response = await fetch(this.API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    return response
  }

  public async patch (payload: Object, id: string, token: string | null) {    
    const response = await fetch(`${this.API}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    return response
  }

  public async delete (id: string, token: string | null): Promise<any> {
    const response = await fetch(`${this.API}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return response
  }
}