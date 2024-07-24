export interface Message {
  messageID: number;
  senderID: number;
  content: string;
  timestamp: Date;
  chatID: number;
}

export interface User {
  userID: number;
  username: string;
  password: string;
  photoUrl: string;  // Добавлено поле для URL фотографии
  role?: string;  // Добавлено поле для роли
  lastLogin?: Date;  // Добавлено поле для последнего входа
}

export interface ChatDto {
  chatID: number;
  chatName: string;
  participantIds: number[];
}
