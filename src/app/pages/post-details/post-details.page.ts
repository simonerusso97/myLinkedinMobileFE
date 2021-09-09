import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonDocument } from 'src/app/models/json-document';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

import { Applicant } from 'src/app/models/applicant';
import { Commento } from 'src/app/models/commento';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import {Attached} from "../../models/attached";
import {FileOpener} from "@ionic-native/file-opener/ngx";
import {Platform} from "@ionic/angular";





@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  post: Post={}as Post;
  comment: Commento={} as Commento;

  user: Applicant;
  err = false;
  attachedList: Attached[] = [];
  constructor(private postService: PostService, private routes: Router, private file: File,
              private filePath: FilePath, private opener: FileOpener, private plt: Platform) { }


  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null){
      this.routes.navigateByUrl('/login',{
        replaceUrl : true
      });      }
    this.post=this.postService.post;
    this.postService.findAttached(this.post.id).subscribe(
      response => {
        this.attachedList = response;
        console.log(response);
      },
      error => {
        console.log('NON POSSO CARICARE GLI ALLEGATI');
        console.log(error.message);
      }
    );

  }


  back(){
    this.routes.navigateByUrl('/tabs/home',{
      replaceUrl : true
    });    }

  sendComment(){
    this.comment.date = new Date();
    this.comment.applicant=this.user;

    this.postService.sendComment(this.comment,this.postService.post).subscribe(
      response=>{
        this.postService.post.commentList.unshift(this.comment);
        this.err=false;
        this.comment = {} as Commento;
      },
      error => {
        this.err = true;
      });
  }

  saveAndOpenPdf(pdf: string, filename: string) {
    const writeDirectory = this.plt.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;

    this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'data:application/pdf'), {replace: true})
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
}
