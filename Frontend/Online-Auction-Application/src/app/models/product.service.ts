import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://your-api-endpoint.com/products'; // Update with your API endpoint

  constructor(private http: HttpClient) { }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }
}
