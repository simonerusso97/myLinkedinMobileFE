import { Component, OnInit } from '@angular/core';
import {Offeror} from '../../models/offeror';
import {Company} from '../../models/company';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {CompanyService} from "../../services/company.service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-sign-up-offeror',
  templateUrl: './sign-up-offeror.component.html',
  styleUrls: ['./sign-up-offeror.component.scss'],
})
export class SignUpOfferorComponent implements OnInit {

  offeror: Offeror = {} as Offeror;
  confirmPassword: string;
  companyList: Company[];
  pwdError = false;
  regError = false;
  private message: string;

  constructor(private userService: UserService, private routes: Router, private companyService: CompanyService,
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

  submit() {
    if (this.offeror.password !== this.confirmPassword){
      this.pwdError = true;
    }
    else{
      this.pwdError = false;
      this.offeror.banned=false;
      this.offeror.disabled=true;
      this.offeror.verified=false;
      this.userService.createOfferor(this.offeror).subscribe(
        response => {
          this.routes.navigateByUrl('/tabs',{
            replaceUrl : true
          });          },
        error => {
          this.regError = true;
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
}
