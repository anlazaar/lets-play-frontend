import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {
  // <CHANGE> Add BehaviorSubject for reactive auth state
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // <CHANGE> Add setToken method
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }

  getRole(): string | null {
    const decoded = this.decodeToken();
    return decoded?.role || null;
  }

  getUUID(): string | null {
    const decoded = this.decodeToken();
    console.log(decoded.sub);
    return decoded?.sub || null; // <CHANGE> Fixed: was returning role instead of UUID
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  // <CHANGE> Update clear to emit false
  clear(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }
}
