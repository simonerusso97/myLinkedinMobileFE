import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Offeror} from '../../models/offeror';
import {Applicant} from '../../models/applicant';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';
import {ToastController} from '@ionic/angular';
import {Attached} from '../../models/attached';

import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';

import {FileOpener} from '@ionic-native/file-opener/ngx';
import {Platform} from '@ionic/angular';
import {Commento} from '../../models/commento';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {

  user: Applicant | Offeror;
  post: Post;
  comment: Commento = {} as Commento;
  replyStatus: boolean[] = [];
  replyComment: Commento = {} as Commento;
  private message;

  constructor( private routes: Router, private postService: PostService, public toastController: ToastController,
               private file: File, private filePath: FilePath, private opener: FileOpener, private plt: Platform) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null){
      this.routes.navigateByUrl('/login',{
        replaceUrl : true
      });
    }

    const extras = this.routes.getCurrentNavigation()?.extras?.state as {
      post: Post;
    };
    this.post = extras.post;
    this.postService.findPost(this.post).subscribe(
      response => {
        this.post = {} as Post;
        this.post = response;
        this.post.attachedList = this.sortFunct(this.post.attachedList);
        if(this.post.commentList === undefined || this.post.commentList === null){
          this.post.commentList = [];
        }
        this.post.commentList.forEach(
          c => {
            this.replyStatus.push(false);
          }
        );
        console.log(this.post.commentList);
      },
      error => {
        this.message = 'Si è verificato un errore' + error.error.message;
        this.presentToast();
      }
    );
  }

  back() {
    this.routes.navigateByUrl('/tabs',{
      replaceUrl : true
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

  openPdf(code: string, filename: string) {
    const writeDirectory = this.plt.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;

    this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(code, 'data:application/pdf'), {replace: true})
      .then(() => {
        this.opener.open(writeDirectory + filename, 'application/pdf')

          .catch(() => {
            console.log('Error opening pdf file');
          });
      })
      .catch(() => {
        console.error('Error writing pdf file');
      });
  }

  sortFunct(list: Attached[]): Attached[]{
    let sortedList: Attached[] = [];
    list.forEach(
      attached => {
        if(attached.type === 'pdf'){
          sortedList.push(attached);
        }
      });
    list.forEach(
      attached => {
        if(attached.type === 'Image'){
          sortedList.push(attached);
        }
      });
    return sortedList;
  }

  convertBase64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
  }

  sendComment() {
    this.comment.applicant = this.user;
    this.comment.date = new Date();
    this.post.commentList.push(this.comment);
    this.postService.sendComment(this.post, this.comment).subscribe(
      ()=>{
        this.comment = {} as Commento;
      },
      error => {
        let cont=0;
        let index = -1;
        this.post.commentList.forEach(
          c => {
            if(c.id === this.comment.id){
              index = cont;
            }
            cont++;
          }
        );
        this.post.commentList.splice(index, 1);
        this.message = 'Si è verificato un error' + error.error.message;
        this.presentToast();
      });

  }

  showTextArea(index: number) {
    const value = this.replyStatus[index];
    this.replyStatus.splice(index, 1, !value);
    console.log('hit', this.replyStatus[index]);
  }

/*
  sendReply(index: number) {
    this.replyComment.applicant = this.user;
    this.replyComment.date = new Date();
    (this.post.commentList[index].answerList as Commento[]).push(this.replyComment);
    this.postService.sendAnswer(this.post, this.comment, this.post.commentList[index].id).subscribe(
      ()=>{
        this.replyComment = {} as Commento;
        this.replyStatus.splice(index, 1, false);
      },
      error => {
        let cont=0;
        let i = -1;
        this.post.commentList.forEach(
          c => {
            if(c.id === this.comment.id){
              i = cont;
            }
            cont++;
          }
        );
        this.post.commentList.splice(i, 1);
        this.message = 'Si è verificato un error' + error.error.message;
        this.presentToast();
      });
  }
*/
}
