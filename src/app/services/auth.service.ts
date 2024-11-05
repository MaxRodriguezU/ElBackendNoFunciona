import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://dummyjson.com/auth/login';

  constructor(
    private http: HttpClient
  ) { }

  // Método para iniciar sesión
  login(username: string, password: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<User>(this.apiUrl, body, { headers });
  }

  // Guardar el token en local storage
  saveToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  // Obtener el token del local storage
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Cerrar sesión eliminando el token
  logout(): void {
    localStorage.removeItem('accessToken');
  }

  // Método para obtener el token en el formato "Bearer <token>"
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
}
