import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../models/chat.model';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ]
})
export class LoginComponent {
  user = { username: '', password: '' };
  errorMessage: string | null = null;
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(event: Event) {
    event.preventDefault();
    this.authService.login(this.user.username, this.user.password).subscribe(
      (user: User) => {
        console.log('Login successful', user);
        this.authService.setCurrentUser(user); // Сохранение текущего пользователя
        this.router.navigate(['/chat']);
        this.errorMessage = null; // Сброс сообщения об ошибке при успешном входе
      },
      error => {
        console.error('Failed to login', error);
        this.errorMessage = 'Invalid username or password'; // Установка сообщения об ошибке
      }
    );
  }
  switchToRegister() {
    this.router.navigate(['/register']);
  }
}
