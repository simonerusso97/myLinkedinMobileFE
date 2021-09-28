import { Component, OnInit } from '@angular/core';
import {Regular} from '../../models/regular';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {LoadingController} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-regular-login',
  templateUrl: './regular-login.component.html',
  styleUrls: ['./regular-login.component.scss'],
})

export class RegularLoginComponent implements OnInit {

  loginError = {
    error: false,
    message: null
  };
  localizationError = {
    error: false,
    message: null
  };
  disabledError = {
    error: false,
    message: 'L\'amministratore non ha ancora approvato la tua richiesta di registrazione'
  };
  bannedError = {
    error: false,
    message: 'Sei stato temporanemente bannato'
  };
  adminError = {
    error: false,
    message: 'Non ti è consentito l\'accesso a questa interfaccia'
  };
  submit = false;
  regular: Regular = {} as Regular;
  private regularLoginForm: FormGroup;

  private validationMessages = {
    email: [
      {type: 'required', message: 'Non può essere vuoto'},
      {type: 'email', message: 'Formato non valido'}
    ],
    password: [
      {type: 'required', message: 'Non può essere vuoto'}
    ]
  };

  constructor(private userService: UserService, private route: Router, public loadingController: LoadingController,
              private geo: Geolocation, public formBuilder: FormBuilder) {
    this.regularLoginForm = new FormGroup({
      email: new FormControl('', Validators.compose(
        [
          Validators.required,
          Validators.email
        ])),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  login() {
    this.submit = true;
    this.regular = this.regularLoginForm.value;
    if(this.regularLoginForm.valid) {
      this.userService.login(this.regular).subscribe(
        response => {
          this.loginError.error = false;
          this.disabledError.error = false;
          this.bannedError.error = false;

          if (response.disabled) {
            this.disabledError.error = true;
          } else if (response.banned) {
            this.bannedError.error = true;
          } else if (response.type === 'admin') {
            this.adminError.error = true;
          } else {
            sessionStorage.setItem('user', JSON.stringify(response));
            this.presentLoading();
          }
        },
        error => {
          this.loginError.error = true;
          this.loginError.message = 'Errore durante il login: \n' + error.error.message;
        });
    }
  }

  navigateTo(signup: string) {
    this.route.navigateByUrl(signup, {
      replaceUrl: true
    });
  }

  private async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Attendi localizzazione',
    });
    await loading.present();

    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    })
      .then((response) => {
        sessionStorage.setItem('coordinates', JSON.stringify(response.coords));
        loading.dismiss();
        this.route.navigateByUrl(
          '/tabs',
          {
            replaceUrl : true
          });
      })
      .catch((error) => {
        loading.dismiss();
        this.localizationError.error = true;
        this.localizationError.message = 'Errore duarente la geolocalizzazione: \n' + error;
        sessionStorage.clear();
      });
  }
}

    /*Geolocation.prototype.getCurrentPosition(
      response => {
        sessionStorage.setItem('coordinates', JSON.stringify(response.coords));
        loading.dismiss();
        /!*this.route.navigateByUrl('/tabs',{
          replaceUrl : true
        });*!/
      },
      error => {
        loading.dismiss();
        this.localizationError.error = true;
        this.localizationError.message = 'Errore duarente la geolocalizzazione: \n' + error;
        sessionStorage.clear();
      },
      {
        timeout: 1000,
        enableHighAccuracy: true
      }
    );*/

