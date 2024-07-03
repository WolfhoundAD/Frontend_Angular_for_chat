import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | null = null;

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('Connected to WebSocket server.');
    };

    this.socket.onmessage = (event) => {
      console.log('Received message: ', event.data);
      // Здесь вы можете обновить список сообщений в реальном времени
    };

    this.socket.onclose = () => {
      console.log('Disconnected from WebSocket server.');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };
  }
}
