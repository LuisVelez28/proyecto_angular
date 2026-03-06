import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'current_user';

  login(username: string, password: string): boolean {
    // Credenciales de ejemplo para demo.
    if (username === 'admin' && password === '12345') {
      localStorage.setItem(this.storageKey, username);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  getUser(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}