import { Component, OnInit } from '@angular/core';
import {Offeror} from '../../models/offeror';
import {Company} from '../../models/company';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-offeror-sign-up',
  templateUrl: './offeror-sign-up.component.html',
  styleUrls: ['./offeror-sign-up.component.scss'],
})
export class OfferorSignUpComponent implements OnInit {

  offeror: Offeror = {} as Offeror;
  confirmPassword: string;
  companyList: Company[];
  pwdError = {
    error: false,
    message: 'Le password non coincidono'
  };
  regError = {
    error: false,
    message: 'Le password non coincidono'
  };
  private message: string;

  constructor(private userService: UserService, private route: Router, private companyService: CompanyService,
              public toastController: ToastController) {
  }

  ngOnInit() {
    this.companyService.findAll().subscribe(
      response => {
        this.companyList = response;
      },
      error => {
        this.message = 'Si è verificato un errore, riprova';
        this.presentToast();
      }
    );
  }

  signup() {
    if (this.offeror.password !== this.confirmPassword){
      this.pwdError.error = true;
    }
    else{
      this.pwdError.error = false;
      this.userService.offerorSignUp(this.offeror).subscribe(
        response => {
          this.route.navigateByUrl('/login',{
            replaceUrl : true
          });          },
        error => {
          this.regError.error = true;
          this.regError.message = 'Si è verificato un errore' + error;
        });

    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

  setCompany(company: any) {
    this.offeror.company = company;

  }

  navigateTo(signup: string) {
    this.route.navigateByUrl(signup, {
      replaceUrl: true
    });
  }

}
