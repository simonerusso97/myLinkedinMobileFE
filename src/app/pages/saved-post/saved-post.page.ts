import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Platform, ToastController} from '@ionic/angular';
import { Applicant } from 'src/app/models/applicant';
import { Offeror } from 'src/app/models/offeror';
import { PostService } from 'src/app/services/post.service';
import {Post} from '../../models/post';
import {UserService} from '../../services/user.service';
import {PDFGenerator} from '@ionic-native/pdf-generator/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-saved-post',
  templateUrl: './saved-post.page.html',
  styleUrls: ['./saved-post.page.scss'],
})
export class SavedPostPage implements OnInit {

  post: Post = {} as Post;
  user: Offeror | Applicant;
  checkList: {post: Post; checked: boolean}[] = [];
  interestedPostList: Post[] = [];

  postPdf: Post={} as Post;
  sizeAtt: number;
  private message: string;

  constructor(private routes: Router, private postService: PostService, public toastController: ToastController,
              private userService: UserService, private pdfGenerator: PDFGenerator, private plt: Platform,
              private file: File, private fileOpener: FileOpener) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  ionViewDidEnter() {
    this.checkList = [];
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user == null) {
      this.routes.navigateByUrl('/login',{
        replaceUrl : true
      });
    }
    else {
      this.userService.findAllInterestedPost(this.user).subscribe(
        response => {
          this.interestedPostList = response;
          this.interestedPostList.forEach(
            post => {
              this.checkList.push({
                post,
                checked: false
              });
            });
        },
        error => {
          this.message = 'Si è verificato un errore' + error.error.message;
          this.presentToast();
        }
      );

    }
  }

  delete(post: Post) {
    let index = -1;
    let cont = 0;
    this.interestedPostList.forEach(
      p =>{
        if (p.id === post.id){
          index = cont;
        }
        cont++;
      }
    );
    if (index > -1) {
      this.interestedPostList.splice(index, 1);
      this.checkList.splice(index, 1);
      this.userService.updateInterested(this.user, this.interestedPostList).subscribe(
        response => {
          sessionStorage.setItem('user', JSON.stringify(this.user));
          this.message = 'Eliminato correttamente';
          this.presentToast();
        },
        error => {
          this.message = 'Si è verificato un errore' + error.error.message;
          this.presentToast();
          this.interestedPostList.unshift(post);
        }
      );
    }
    else {
      this.message = 'Si è verificato un errore';
      this.presentToast();
    }


  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

  generatePDF() {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    let c = [];
    let filename: string;
    let docDefinition: any;
    let blob;
    let pdfObj;

    this.checkList.forEach(
      post => {
        console.log('next post');

        if (post.checked) {
          filename = post.post.name + '-' + post.post.createdBy.name + post.post.createdBy.surname + '.pdf';
          c = [];
          docDefinition = {
            content: [
              {text: 'Post', style: 'header'},
              {text: post.post.name},

              {text: 'Creata da', style: 'subheader'},
              {text: post.post.createdBy.name},

              {text: 'Data di pubblicazione', style: 'subheader'},
              {text: post.post.pubblicationDate},

              {text: 'Skill richieste', style: 'subheader'}
            ],

            styles: {
              header: {
                alignment: 'center',
                fontSize: 18,
                bold: true,
              },

              subheader: {
                fontSize: 14,
                bold: true,
                margin: [0, 15, 0, 0]
              },

              story: {
                italic: true,
                alignment: 'left',
                width: '50%'
              }
            }
          };

          post.post.skillList.forEach(
            skill => {
              c.push({text: skill.name, style: 'story', margin: [0, 20, 0, 20]});
              c.push({text: skill.description, style: 'story', margin: [0, 20, 0, 20]});
            }
          );

          post.post.jsonDocument.forEach(
            jd => {
              c.push({text: jd.nameAttribute, style: 'subheader'});
              c.push({text: jd.value, style: 'story', margin: [0, 20, 0, 20]});
            }
          );

          docDefinition.content.push(c);
          pdfObj = pdfMake.createPdf(docDefinition);
          console.log('filename before getBuffer: ', filename);
          console.log('pdfObj before getBuffer: ', pdfObj);

          //TODO: correggere bug e salvare pdf
          pdfObj.getBuffer(
            (buffer) => {
              console.log('pdfObj after getBuffer but before writeFile: ', pdfObj);
              blob = new Blob([new Uint8Array(buffer).buffer], {type: 'application/pdf'});
              console.log('filename after getBuffer but before writeFile: ', filename);
              console.log('this.file.documentsDirectory:' + this.file.dataDirectory);

              this.file.writeFile(this.file.dataDirectory, filename, blob)
                .then(
                  () => {
                    console.log('pdfObj after writefile: ', pdfObj);
                    console.log('filename after writefile: ', filename);

                    this.fileOpener.open(this.file.dataDirectory + filename, 'application/pdf');
                  }
                );
            });
          c = [];
        }
      });

  }
}
