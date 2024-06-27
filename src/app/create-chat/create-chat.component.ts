import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChatService } from '../services/chat.service';
import { User } from '../models/chat.model';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-chat',
  standalone: true,
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.css'],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule
  ]
})
export class CreateChatComponent implements OnInit {
  chatName: string = '';
  selectedUsers: number[] = [];
  users: User[] = [];

  constructor(
    private chatService: ChatService,
    public dialogRef: MatDialogRef<CreateChatComponent>
  ) {}

  ngOnInit() {
    this.chatService.getAllUsers().subscribe(users => this.users = users);
  }

  createChat() {
    const chatDto = {
      id: 0,
      chatname: this.chatName,
      participantIds: this.selectedUsers
    };

    this.chatService.createChat(chatDto).subscribe(
      createdChat => {
        console.log('Chat created:', createdChat);
        this.dialogRef.close(createdChat);
      },
      error => console.error('Failed to create chat', error)
    );
  }
}
