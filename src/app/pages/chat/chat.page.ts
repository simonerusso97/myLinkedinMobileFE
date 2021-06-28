import { Message } from 'src/app/models/message';
import {Component, OnInit, ViewChild} from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {Applicant} from "../../models/applicant";
import {Offeror} from "../../models/offeror";
import {Router} from "@angular/router";
import {IonContent} from "@ionic/angular";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  userChat:User={} as User;
  user: Applicant | Offeror;
  messageList:Message[]=[];
  message: Message = {} as Message;
  constructor(private userService:UserService, private routes: Router) {
  }
  @ViewChild(IonContent) content: IonContent;
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log('sono nell init');
    if (this.user == null) {
      this.routes.navigateByUrl('/login',{
        replaceUrl : true
      });
    }
    else{
      this.userChat = this.userService.user;
      this.userService.findMessage(this.user, this.userChat).subscribe(
        response => {
          this.messageList = response;
          this.messageList = this.messageList.sort((obj1, obj2) => {
            if (obj1.date > obj2.date) {
              return 1;
            }

            if (obj1.date < obj2.date) {
              return -1;
            }
            return 0;
          });
        },
        error => {}
      );
    }

    console.log(this.messageList);

  }

  sendMessage(){
    this.message.sendingUser = this.user;
    this.message.receivingUser = this.userChat;
    this.message.date = new Date();

    this.userService.sendMessage(this.message).subscribe(
      response => {
        this.messageList.push(this.message);
        this.messageList = this.messageList.sort((obj1, obj2) => {
          if (obj1.date > obj2.date) {
            return 1;
          }

          if (obj1.date < obj2.date) {
            return -1;
          }
          return 0;
        });
        this.message = {} as Message;
        this.content.scrollToBottom(200);
      },
      error => {

      }
    );


  }

  back(){
    this.routes.navigateByUrl('/tabs/chatHub',{
      replaceUrl : true
    });
  }

}
