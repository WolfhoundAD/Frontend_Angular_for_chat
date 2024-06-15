import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message, User } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user).pipe(
      catchError(this.handleError)
    );
  }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user).pipe(
      catchError(this.handleError)
    );
  }


  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/messages`).pipe(
      catchError(this.handleError)
    );
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/messages`, message).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
