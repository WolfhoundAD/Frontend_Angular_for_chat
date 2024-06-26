import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ChatService } from './services/chat.service';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    ChatComponent,
    RegisterComponent,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/login']);
    }
  }
}
