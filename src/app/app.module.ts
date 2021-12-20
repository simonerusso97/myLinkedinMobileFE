import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {File} from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {IOSFilePicker} from '@ionic-native/file-picker/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {DatePicker} from '@ionic-native/date-picker/ngx';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [Geolocation, FileOpener, File, Camera, NativeGeocoder, IOSFilePicker, FileChooser, DatePicker, FilePath, FirebaseX,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
