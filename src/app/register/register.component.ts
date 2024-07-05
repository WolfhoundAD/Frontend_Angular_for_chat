import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/chat.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RegisterComponent {
  registrationData = {
    username: '',
    password: '',
    fullName: ''
  };
  photoFile: File | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit(event: Event) {
    event.preventDefault();
    try {
      if (this.photoFile) {
        await this.authService.register(this.registrationData, this.photoFile).toPromise();
        this.router.navigate(['/login']);
      } else {
        console.error('No photo file selected');
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  }

  onFileSelected(event: any) {
    this.photoFile = event.target.files[0];
  }

  switchToLogin() {
    this.router.navigate(['/login']);
  }
}
