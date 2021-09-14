import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  type: string;

  constructor() { }

  ngOnInit() {
    this.type = 'user';
    //TODO: rimuovere commento
    /*if(sessionStorage.getItem('user') !== null) {
      this.routes.navigateByUrl('/tabs',{
        replaceUrl : true
      });
    }*/
  }

}
