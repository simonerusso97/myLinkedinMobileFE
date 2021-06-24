import {User} from './user';

export interface Message {
  id: number;
  data: Date;
  receivingUser: User;
  sendingUser: User;
  text: string;
}
