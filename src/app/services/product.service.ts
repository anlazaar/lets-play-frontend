import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable()
export class ProductService {
  private API_URL = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  addProduct(product: any) {
    return this.http.post(`${this.API_URL}`, product);
  }

  getProductById(id: string) {
    return this.http.get<Product>(this.API_URL + '/' + id);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }
}
