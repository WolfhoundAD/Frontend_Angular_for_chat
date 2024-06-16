import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { User } from '../models/chat.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  user: User = { id: 0, username: '', password: '' };
  isLoginMode = true;

  constructor(private chatService: ChatService, private router: Router) {}

  async onSubmit(event: Event) {
    event.preventDefault(); // Предотвращает стандартное поведение формы
    try {
      if (this.isLoginMode) {
        const response = await this.chatService.loginUser(this.user).toPromise();
        localStorage.setItem('token', response.token);
        await this.router.navigate(['/chat']);
      } else {
        await this.chatService.registerUser(this.user).toPromise();
        this.isLoginMode = true;
      }
    } catch (error) {
      console.error(this.isLoginMode ? 'Login failed' : 'Registration failed', error);
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
