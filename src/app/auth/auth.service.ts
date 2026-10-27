import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  login(email: string, password: string): boolean {
    if (email === 'roberto@modeladoryoga.com.br' && password === '123') {
      localStorage.setItem('token', 'ok');
      return true;
    }
    return false;
  }

   loginAuth(auth: boolean): boolean {
    if (auth) {
      localStorage.setItem('token', 'ok');
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}