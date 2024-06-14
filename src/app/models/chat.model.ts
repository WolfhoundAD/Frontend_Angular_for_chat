export interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
}

export interface User {
  id: number;
  username: string;
  password: string;
}
