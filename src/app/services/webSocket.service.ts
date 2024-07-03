import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  private messageSubject = new Subject<any>();

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('Connected to WebSocket server.');
    };

    this.socket.onmessage = (event) => {
      console.log('Received message: ', event.data);
      this.messageSubject.next(JSON.parse(event.data));
    };

    this.socket.onclose = () => {
      console.log('Disconnected from WebSocket server.');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };
  }

  get messages() {
    return this.messageSubject.asObservable();
  }

  sendMessage(message: any) {
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected.');
    }
  }
}
