import { Component, OnInit } from '@angular/core';
import {Offeror} from '../../models/offeror';
import {Company} from '../../models/company';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {ToastController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  submit = false;
  private offerorSignUpForm: FormGroup;
  private message: string;
  private validationMessages = {
    name: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    surname: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    email: [
      {type: 'required', message: 'Non può essere vuoto'},
      {type: 'email', message: 'Deve avere un formato email valido'}
    ],
    birthDate: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    password: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Non può essere vuoto'},
    ],
    address: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    degree: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    position: [
      {type: 'required', message: 'Non può essere vuoto'}
    ],
    company: [
      {type: 'required', message: 'Non può essere vuoto'}
    ]
  };



  constructor(private userService: UserService, private route: Router, private companyService: CompanyService,
              public toastController: ToastController) {
    this.offerorSignUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.email
        ])),
      birthDate: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.compose(
        [
          Validators.required,
        ])),
      address: new FormControl('', Validators.required),
      degree: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      company: new FormControl(null, Validators.required)
    });
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
    this.submit = true;
    this.pwdError.error = false;
    if (this.offerorSignUpForm.value.password !== this.offerorSignUpForm.value.confirmPassword){
      this.pwdError.error = true;
    }
    else if(this.offerorSignUpForm.valid)
    {
      this.offeror = this.offerorSignUpForm.value;
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
