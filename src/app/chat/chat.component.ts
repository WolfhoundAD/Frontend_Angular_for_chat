import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/chat.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getMessages().subscribe(
      messages => this.messages = messages,
      error => console.error('Failed to load messages', error)
    );
  }

  sendMessage() {
    const message: Message = {
      id: 0,
      sender: 'current_user', // Replace with the actual sender
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
