import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatDto, Message, User } from '../models/chat.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/chat/users`);
  }
  
  getAllChatsForUser(userId: number): Observable<ChatDto[]> {
    return this.http.get<ChatDto[]>(`${this.apiUrl}/chat/user/${userId}/chats`);
  }

  getMessages(chatId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/message/chat/${chatId}`);
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/message/create`, message);
  }

  createChat(chatDto: ChatDto): Observable<ChatDto> {
    return this.http.post<ChatDto>(`${this.apiUrl}/chat/create`, chatDto);
  }
  /*
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }
    */
}
