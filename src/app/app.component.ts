import {Component, OnInit} from '@angular/core';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import {Platform} from "@ionic/angular";
import {NavigationExtras, Router} from "@angular/router";
import {ToNotifyPost} from "./models/to-notify-post";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private firebaseX: FirebaseX, private plt: Platform, private route: Router) { }

  ngOnInit(): void {

    this.plt.ready().then(() => {
      this.firebaseX.onMessageReceived()
        .subscribe(data => {
          let tnpList: ToNotifyPost[] = [];
          if(data.tap !== undefined && data.tnp !== undefined){

            tnpList = JSON.parse(data.tnp) as ToNotifyPost[];
            console.log(tnpList);
            const navigationExtras: NavigationExtras = {
              state: {
                tnpList,
              },
              replaceUrl: true
            };
            this.route.navigateByUrl('/summary', navigationExtras);
          }

        });
    });
  }
}
