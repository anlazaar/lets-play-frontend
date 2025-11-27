import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    const payload = token.split('.')[1];
    const decoded = atob(payload); // decode base64
    return JSON.parse(decoded);
  }

  getRole(): string | null {
    const decoded = this.decodeToken();
    return decoded?.role || null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  clear() {
    localStorage.removeItem('token');
  }
}
