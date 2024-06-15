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

  onSubmit() {
    if (this.isLoginMode) {
      this.chatService.loginUser(this.user).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/swagger-ui/index.html']);
        },
        error => console.error('Login failed', error)
      );
    } else {
      this.chatService.registerUser(this.user).subscribe(
        response => {
          this.isLoginMode = true;
        },
        error => console.error('Registration failed', error)
      );
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
