import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
