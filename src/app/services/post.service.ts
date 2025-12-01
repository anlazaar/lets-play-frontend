import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResponse } from '../models/global.model';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable()
export class PostService {
  private API_URL = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  addPost(product: any) {
    return this.http.post(`${this.API_URL}`, product);
  }

  getPostById(id: string) {
    return this.http.get<PostResponse>(this.API_URL + '/' + id);
  }

  getAllPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(this.API_URL);
  }

  likePost(id: string) {
    return this.http.post(
      `http://localhost:8080/api/likes/${id}/like`,
      {},
      { withCredentials: true }
    );
  }

  unlikePost(id: string) {
    return this.http.post(
      `http://localhost:8080/api/likes/${id}/unlike`,
      {},
      { withCredentials: true }
    );
  }
}
