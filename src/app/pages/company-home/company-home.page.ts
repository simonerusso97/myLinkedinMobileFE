import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Company} from "../../models/company";
import {User} from "../../models/user";
import {ToastController} from "@ionic/angular";
import {Offeror} from "../../models/offeror";

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.page.html',
  styleUrls: ['./company-home.page.scss'],
})
export class CompanyHomePage implements OnInit {
  private company: Company;
  userList: Offeror[] = [];
  private message: string;

  constructor(private routes: Router, private userService: UserService, private toastController: ToastController) { }

  ngOnInit() {
    this.company = JSON.parse(sessionStorage.getItem('company'));
    this.userService.findAllNotVerifiedUser(this.company).subscribe(
      response => {
        this.userList = response;
      },
      error => {
        this.message = 'Si è verificato un errore';
        this.presentToast();
      }

    );


  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

  accept(user: User) {
    this.userService.verifyUser(user).subscribe(
      response => {
        this.message='operazione completata';
        this.presentToast();
        this.userList = this.userList.filter(u =>
        u.id != user.id);
      },
      error => {
        this.message='operazione fallita';
        this.presentToast();
      }
    )
  }

  discard(user: User) {

  }
}
