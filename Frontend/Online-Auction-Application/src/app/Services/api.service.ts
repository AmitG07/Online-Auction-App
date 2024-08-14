import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private baseApiUrl = 'https://localhost:7098/api';
  private ApiUrl = 'https://localhost:7098/api/user';

  constructor(private http: HttpClient) { }

  // USER CONTROLLER
  LoginCustomer(data: any): Observable<any> {
    return this.http.post<any>(`${this.ApiUrl}/login`, data);
  }

  AdminLogin(data: any): Observable<any> {
    return this.http.post<any>(`${this.ApiUrl}/Admin-Login`, data);
  }

  GetUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}/GetUserById/${id}`);
  }

  GetAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/user/GetAllUsers`);
  }

  // PRODUCT CONTROLLER
  AddProduct(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/product`, data);
  }

  GetAllProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseApiUrl}/product/GetAllProducts`);
  }

  GetProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/product/GetProductById/${id}`);
  }

  SearchAndSortProducts(params: {
    name?: string;
    category?: string;
    minPrice?: number | null;
    maxPrice?: number | null;
    sortBy?: string;
    page?: number;
    pageSize?: number;
  }): Observable<ProductResponse> {
    let httpParams = new HttpParams();
    if (params.name) httpParams = httpParams.set('name', params.name);
    if (params.category) httpParams = httpParams.set('category', params.category);
    if (params.minPrice !== null && params.minPrice !== undefined) httpParams = httpParams.set('minPrice', params.minPrice.toString());
    if (params.maxPrice !== null && params.maxPrice !== undefined) httpParams = httpParams.set('maxPrice', params.maxPrice.toString());
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());

    return this.http.get<ProductResponse>(`${this.baseApiUrl}/product/SearchAndSort`, { params: httpParams });
  }

  // BID CONTROLLER
  PlaceBid(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/bid`, data);
  }

  GetBidsByProductId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/bid/GetBidsByProductId/${id}`);
  }

  GetBidByUserId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/bid/GetBidByUserId/${id}`);
  }

  GetAllBids(): Observable<any> {
    return this.http.get<any[]>(`${this.baseApiUrl}/bid/GetAllBids`);
  }

  DeleteBid(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}/bid/${id}`);
  }
}
