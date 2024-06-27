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
}

export interface ChatDto {
  chatID: number;
  chatName: string;
  participantIds: number[];
}
