import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-chat-hub',
  templateUrl: './chat-hub.page.html',
  styleUrls: ['./chat-hub.page.scss'],
})
export class ChatHubPage implements OnInit {
  userList: User[] = [];
  user: User = {} as User;
  chatUser: User[] = [];
  showingList: User[] = [];
  private message: string;
  constructor(private userService: UserService, private routes: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user);
    if (this.user == null) {
      this.routes.navigateByUrl('/login',{
        replaceUrl : true
      });
    }
    else {
      this.userService.user = {} as User;
      this.userService.findAll().subscribe(
        response => {
          this.userList = response;
        },
        error => {
          this.message = 'Si è verificato un errore, riprova';
          this.presentToast();
        }
      );
      this.userService.findAllMessages(this.user).subscribe(
        response => {
          this.user.messageList = response;
        },
        error => {
          this.message = 'Si è verificato un errore, riprova';
          this.presentToast();
        }
      );

      this.user.messageList.forEach(mess => {
        if(mess.receivingUser.id != this.user.id){
          this.chatUser.unshift(mess.receivingUser);
        }

        if(mess.sendingUser.id != this.user.id){
          this.chatUser.unshift(mess.sendingUser);
        }
      });

      this.chatUser = this.chatUser.filter((user, index, list) =>
        index === list.findIndex((t) => (
        t.id === user.id   ))
      );

      this.showingList = this.chatUser;

    }
  }

  findUsers(event: any) {
    const val = event.target.value;
    if (val && val.trim() !== '' ){
      this.showingList = this.userList.filter(us =>
        (us.name + ' ' + us.surname).toUpperCase().includes(val.toUpperCase()) && us.id != this.user.id && us.type != this.user.type);
    }
    else{
      this.showingList = this.chatUser;
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

  openChat(user: User) {
    this.userService.user = user;
    this.routes.navigateByUrl('/tabs/chat',{
      replaceUrl : true
    });    }
}
