import { Component, OnInit } from '@angular/core';
import {Post} from '../../../models/post';
import {Applicant} from '../../../models/applicant';
import {Offeror} from '../../../models/offeror';
import {Router} from '@angular/router';
import {User} from '../../../models/user';
import {Message} from '../../../models/message';
import {UserService} from '../../../services/user.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  user: Applicant | Offeror;
  otherUser: User;
  messageList: Message[];
  message: Message = {} as Message;
  private errorMessage = '';

  constructor(private route: Router, private userService: UserService, private toastController: ToastController) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null){
      this.route.navigateByUrl('/login',{
        replaceUrl : true
      });
    }
    const extras = this.route.getCurrentNavigation()?.extras?.state as {
      user: User;
      extrasList: Message[];
    };

    this.otherUser = extras.user;
    this.messageList = extras.extrasList;

    console.log(this.messageList);
    console.log(this.user);
    console.log(this.otherUser);
  }

  back() {
    this.route.navigateByUrl('/tabs',{
      replaceUrl : true
    });
  }

  sendMessage() {
    this.message.sendingUser = this.user;
    this.message.receivingUser = this.otherUser;
    this.message.date = new Date();
    this.userService.sendMessage(this.message).subscribe(
      response => {
        this.messageList.push(this.message);
        this.message = {} as Message;
      },
    error => {
      this.errorMessage = 'Si è verificato un errore' + error.error.message;
      this.presentToast();
    }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.errorMessage,
      duration: 2000
    });
    toast.present();
  }
}
