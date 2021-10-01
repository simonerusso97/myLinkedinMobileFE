import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {Message} from '../../../models/message';
import {NavigationExtras, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ToastController} from '@ionic/angular';
import {Applicant} from "../../../models/applicant";
import {Offeror} from "../../../models/offeror";

@Component({
  selector: 'app-chat-hub',
  templateUrl: './chat-hub.page.html',
  styleUrls: ['./chat-hub.page.scss'],
})
export class ChatHubPage implements OnInit {

  userList: User[] = [];
  showingList: User[] = [];
  lastMessageList: Message[] = [];
  messageList: Message[] = [];
  user: Applicant | Offeror;
  errorMessage = '';
  chatHub = true;
  constructor(private route: Router, private userServiece: UserService, private toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (sessionStorage.getItem('user') === null) {
      this.route.navigateByUrl('/login', {
        replaceUrl: true
      });
    }
    else{
      this.chatHub=true;
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.getMessages();
    }
  }

  search(event: any) {
    const val = event.target.value;
    if (val && val.trim() !== ''){
      this.showingList = this.showingList.filter(user =>
        (user.name +' '+ user.surname).toUpperCase().includes(val.toUpperCase())
      );
    }
    else{
      this.showingList = this.userList;
    }
  }

  newChat() {
    this.chatHub = false;
    this.userServiece.findAllUser().subscribe(
      response => {
        this.userList = response;
        this.showingList = this.userList;
      },
      error => {
        this.errorMessage = 'Si è verificato un errore' + error.error.message;
        this.presentToast();
      }
    );
  }

  openChat(user: User) {
    let extrasList: Message[] = this.messageList.filter(
      message => (message.receivingUser.id === user.id || message.sendingUser.id === user.id) && (message.receivingUser.id === this.user.id || message.sendingUser.id === this.user.id));

    const navigationExtras: NavigationExtras = {
      state: {
        user,
        extrasList
      },
      replaceUrl: true
    };
    this.route.navigateByUrl('/chat', navigationExtras);

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.errorMessage,
      duration: 2000
    });
    toast.present();
  }

  back() {
    this.chatHub = true;
    this.userList = [];
    this.showingList = [];
    this.getMessages();
  }

  private getMessages(){
    this.userList = [];
    this.showingList = [];
    this.userServiece.getAllMessage(this.user).subscribe(
      response => {
        this.messageList = response;
        this.messageList.forEach(
          message => {
            if(message.receivingUser.id !== this.user.id && !this.userList.some(user => message.receivingUser.id === user.id)){
              this.userList.push(message.receivingUser);
              this.lastMessageList.push(message);
            }
            if(message.sendingUser.id !== this.user.id && !this.userList.some(user => message.sendingUser.id === user.id)){
              this.userList.push(message.sendingUser);
              this.lastMessageList.push(message);
            }
          }
        );
        this.showingList = this.userList;
      },
      error => {
        this.errorMessage = 'Si è verificato un errore' + error.error.message;
        this.presentToast();
      }
    );
  }
}
