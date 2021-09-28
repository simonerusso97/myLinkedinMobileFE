import {Message} from "./message";


export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  birthDate: Date;
  password: string;
  type: string;
}
