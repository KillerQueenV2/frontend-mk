import { IUser } from "../global/interfaces";
import BASE_URL from "../global/apiUrl";

export class UsersRepository {
  private API = `${BASE_URL}/usuarios`

  public async getAll (token: string): Promise<IUser[]> {
    const response = await fetch(this.API, {
      headers: {
        'Content-Type': 'application',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    return data
  }
  
  public async getById (id: string, token: string): Promise<IUser> {
    const response = await fetch(`${this.API}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    return data
  }
  
  public async post (payload: Omit<IUser, 'id'> | any): Promise<string> {
    const response = await fetch(this.API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    const status = data.status
    return status
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