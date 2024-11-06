import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://dummyjson.com/auth/products';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getProducts(skip: number = 0): Observable<{ products: Product[], total: number, skip: number, limit: number }> {
    const headers = this.authService.getAuthHeaders(); // Incluye el token en la cabecera
    return this.http.get<{ products: Product[], total: number, skip: number, limit: number }>(`${this.apiUrl}?skip=${skip}&limit=30`, { headers });
  }
}
