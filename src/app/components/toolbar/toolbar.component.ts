import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  lat:String='';
  long:String='';

  constructor(private routes: Router) { }

  ngOnInit() {
    this.lat=sessionStorage.getItem("latitude");
    this.long=sessionStorage.getItem("longitude");
  }

  logout(){
    sessionStorage.clear();
    this.routes.navigateByUrl("/login");

  }

}
