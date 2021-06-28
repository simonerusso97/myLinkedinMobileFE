import {User} from './user';

export interface Message {
  id: number;
  date: Date;
  receivingUser: User;
  sendingUser: User;
  text: string;
}
