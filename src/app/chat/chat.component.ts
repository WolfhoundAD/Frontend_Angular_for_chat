import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { Message, User, ChatDto } from '../models/chat.model';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  users: User[] = [];
  selectedUser: User | null = null;
  currentChat: ChatDto | null = null;
  currentUser: User | null = null;

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current user ID:', this.currentUser?.userID); // Добавьте эту строку для отладки
  }

  loadUsers() {
    this.chatService.getAllUsers().subscribe(
      users => this.users = users,
      error => {
        console.error('Failed to load users', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  loadMessages() {
    if (this.currentChat) {
      this.chatService.getMessages(this.currentChat.id).subscribe(
        messages => this.messages = messages,
        error => console.error('Failed to load messages', error)
      );
    }
  }

  selectUser(user: User) {
    console.log('User selected:', user); // Добавьте эту строку для отладки
    this.selectedUser = user;
    if (this.currentUser) {
      this.createChatAndLoadMessages();
    } else {
      console.error('User not selected or current user ID not available');
    }
  }

  createChatAndLoadMessages() {
    if (this.selectedUser && this.currentUser) {
      const chatDto: ChatDto = {
        id: 1, // ID будет установлен сервером
        chatname: `Chat with ${this.selectedUser.username}`,
        participantIds: [this.currentUser.userID, this.selectedUser.userID]
      };
      this.chatService.createChat(chatDto).subscribe(
        createdChat => {
          this.currentChat = createdChat;
          // this.loadMessages();
        },
        error => console.error('Failed to create chat', error)
      );
    }
  }

  sendMessage() {
    if (this.currentChat && this.newMessage.trim()) {
      const message: Message = {
        id: 0,
        chatId: this.currentChat.id,
        sender: this.currentUser!.userID, // ID текущего пользователя
        content: this.newMessage,
        timestamp: new Date()
      };

      this.chatService.sendMessage(message).subscribe(
        sentMessage => {
          this.messages.push(sentMessage);
          this.newMessage = '';
        },
        error => console.error('Failed to send message', error)
      );
    }
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Failed to logout', error);
      }
    );
  }


}
