import {Component, OnInit} from '@angular/core';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private firebaseX: FirebaseX) { }

  ngOnInit(): void {
    this.firebaseX.onMessageReceived()
      .subscribe(data => console.log(`User opened a notification ${data}`));
  }
}
