export interface Message {
  id: number;
  sender: number;
  content: string;
  timestamp: Date;
  chatId: number;
}

export interface User {
  userID: number;
  username: string;
  password: string;
}

export interface ChatDto {
  id: number;
  chatName: string;
  participantIds: number[];
}
