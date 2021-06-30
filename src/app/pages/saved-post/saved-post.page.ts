import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Platform, ToastController} from '@ionic/angular';
import { Applicant } from 'src/app/models/applicant';
import { Offeror } from 'src/app/models/offeror';
import { PostService } from 'src/app/services/post.service';
import {Post} from '../../models/post';
import {UserService} from '../../services/user.service';
import {PDFGenerator} from "@ionic-native/pdf-generator/ngx";
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { Skill } from 'src/app/models/skill';


@Component({
  selector: 'app-saved-post',
  templateUrl: './saved-post.page.html',
  styleUrls: ['./saved-post.page.scss'],
})
export class SavedPostPage implements OnInit {

  post: Post = {} as Post;
  user: Offeror | Applicant;
  err = false;
  checkecdList: Post[] = [];
  pdfObj:any=null;
  postPdf:Post={} as Post;
  docDefinition:any;
  sizeAtt: number;
  private message: string;

  constructor(private routes: Router, private postService: PostService, public toastController: ToastController,
              private userService: UserService, private pdfGenerator: PDFGenerator, private plt:Platform,
              private file:File, private fileOpener:FileOpener) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));

    if (this.user == null) {
      this.routes.navigateByUrl('/login',{
        replaceUrl : true
      });      } else {
      if ((typeof this.user.interestedPostList) == 'undefined') {
        this.user.interestedPostList = [];
      }
    }

  }

  unsavePost(post: Post): void {
    console.log(post.id);
    this.user.interestedPostList.forEach(item =>{
      console.log(item.id);
    });
    console.log(this.user.interestedPostList);
    this.userService.unsavePost(this.user, post.id).subscribe(
      response => {
        this.user.interestedPostList = this.user.interestedPostList.filter(item => item.id != post.id);
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.message='Operazione completata';
        this.presentToast();
      },
      error => {
        this.err = true;
        this.message = 'Si è verificato un errore, riprova';
        this.presentToast();
      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }

  check(index: number) {
    if(this.checkecdList.includes(this.user.interestedPostList[index])){
      this.checkecdList = this.checkecdList.filter(post => post.id != this.user.interestedPostList[index].id)
    }
    else{
      this.checkecdList.unshift(this.user.interestedPostList[index]);

    }
  }

  generatePDF() {
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
    for(this.postPdf of this.checkecdList){

      let c = [];
      for (let skill of this.postPdf.skillList){
        c.push( {text: skill.name, style:'story', margin:[0,20,0,20]});
        c.push( {text: skill.description, style:'story', margin:[0,20,0,20]});
      }
      for (let jd of this.postPdf.jsonDocument){
         c.push({text: jd.nameAttribute, style: 'subheader'});
         c.push({text: jd.value, style:'story', margin:[0,20,0,20]});
      }

      this.docDefinition={
        content:[
         /* {text: 'Pdf job offer', style:'header'},
          {text: new Date().toTimeString(), alignment:'right'},
*/
          {text: 'Nome', style:'subheader'},
          {text: this.postPdf.name},

          {text: 'Creata da', style:'subheader'},
          {text: this.postPdf.createdBy.name},

          {text: 'Data di pubblicazione', style: 'subheader'},
          {text: this.postPdf.pubblicationDate},

          {text: 'Skill richieste', style: 'subheader' }
        ],

        styles:{
          header: {
            fontSize:18,
            bold:true,
          },

          subheader:{
            fontSize:14,
            bold:true,
            margin:[0,15,0,0]
          },

          story:{
            italic:true,
            alignment: 'left',
            width: '50%'
          }
        }
      }

      this.docDefinition.content.push(c);

      this.pdfObj=pdfMake.createPdf(this.docDefinition);

      if(this.plt.is('cordova')){
        this.pdfObj.getBuffer((buffer)=>{
          var utf8=new Uint8Array(buffer);
          var binaryArray=utf8.buffer;
          var blob= new Blob([binaryArray], {type:'application/pdf'});
          this.file.writeFile(this.file.dataDirectory,"myoffer.pdf", blob, {replace:true}).then(fileEntry =>{
            this.fileOpener.open(this.file.dataDirectory +'myoffer.pdf', 'application/pdf')
          })
        });
      }else{
        this.pdfObj.download();
      }
    }
  }
}




