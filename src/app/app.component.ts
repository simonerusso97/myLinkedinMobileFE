import {Component, OnInit} from '@angular/core';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private firebaseX: FirebaseX, private plt: Platform) { }

  ngOnInit(): void {
    this.plt.ready().then(() => {
      this.firebaseX.onMessageReceived()
        .subscribe(data => {
          console.log('User opened a notification ' + data.tnp);

        });
    });
  }
}
