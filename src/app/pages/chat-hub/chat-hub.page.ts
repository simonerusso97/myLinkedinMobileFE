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
  private message: string;
  constructor(private userService: UserService, private routes: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user);
    if (this.user == null) {
      this.routes.navigateByUrl('login');
    } else {
      this.userService.findAll().subscribe(
        response => {
          this.userList = response;
        },
        error => {
          this.message = 'Si è verificato un errore, riprova';
          this.presentToast();
        }
      );
      this.user.messageList.forEach(mess => {
          if (this.chatUser.length == 0) {
            this.chatUser.unshift(mess.sendingUser);
          } else {
            this.chatUser.forEach(us => {
              if (us.id != mess.sendingUser.id) {
                this.chatUser.unshift(mess.sendingUser);
              }
              if (us.id != mess.receivingUser.id) {
                this.chatUser.unshift(mess.receivingUser);
              }
            });
          }
        }
      );
      console.log(this.chatUser);
    }
  }

  findUsers(event: any) {

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

  openChat() {
    console.log('CLICCATO');
  }
}
