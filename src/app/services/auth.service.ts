import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private api = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  apiCommunicator(path: string, data: any): Observable<any> {
      return this.http.post(`${this.api + path}`, data);  
  }
}
