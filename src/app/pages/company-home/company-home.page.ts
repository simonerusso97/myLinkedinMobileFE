import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Offeror} from '../../models/offeror';
import {Company} from '../../models/company';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.page.html',
  styleUrls: ['./company-home.page.scss'],
})
export class CompanyHomePage implements OnInit {
  offerorList: Offeror[] = [];
  company: Company = {} as Company;
  private message;

  constructor(private userService: UserService, private route: Router, private toastController: ToastController) { }

  ngOnInit() {
    if(sessionStorage.getItem('company') === null){
      this.route.navigateByUrl('/login',{
        replaceUrl : true
      });
    }
    else {
      this.company = JSON.parse(sessionStorage.getItem('company'));
      this.userService.findOfferorNotVerifed(this.company).subscribe(
        response => {
          this.offerorList = response;
        },
        error => {
          this.message = 'Si è  verifivato un errore: ' + error;
        }
      );
    }
  }

  accept(offeror: Offeror) {
    this.userService.acceptOfferor(offeror).subscribe(
      response => {
        this.offerorList = this.offerorList.filter(item => item.id !== offeror.id);
        this.message='Operazione completata';
        this.presentToast();
      },
      error => {
        this.message='Si è  verifivato un errore: ' + error;
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
}
