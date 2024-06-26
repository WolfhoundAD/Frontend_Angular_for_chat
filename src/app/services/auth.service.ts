import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { username, password }, { withCredentials: true })
      .pipe(
        tap(user => {
          if (user) {
            console.log('User logged in:', user);
            this.currentUser = user;
          }
        })
      );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password });
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout(): Observable<any> {
    localStorage.removeItem('currentUser');
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
