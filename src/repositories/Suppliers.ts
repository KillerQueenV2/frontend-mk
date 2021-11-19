import { ISupplier } from "../global/interfaces";
import BASE_URL from "../global/apiUrl";

export class SuppliersRepository {
  private API = `${BASE_URL}/fornecedores`

  public async getAll (token: string): Promise<ISupplier[]> {
    const response = await fetch(this.API, {
      headers: {
        'Content-Type': 'application',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    return data
  }

  public async getById (id: number): Promise<ISupplier> {
    const response = await fetch(`${this.API}/${id}`)
    const data = await response.json()
    return data
  }

  public post (payload: Omit<ISupplier, 'id'>, token: string): void {
    fetch(this.API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
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
    const data = await response.json()
    return data
  }

  public async delete (id: string, token: string | null): Promise<void> {
    const response = await fetch(`${this.API}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    return data
  }
}