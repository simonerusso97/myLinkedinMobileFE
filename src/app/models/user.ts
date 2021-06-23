import {Message} from '@angular/compiler/src/i18n/i18n_ast';

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  birthDate: Date;
  password: string;
  type: string;
  messageList: Message[];

}
