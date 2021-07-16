import { Component, OnInit } from '@angular/core';
import {Offeror} from '../../models/offeror';
import {Applicant} from '../../models/applicant';
import {Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {Structure} from '../../models/structure';
import {Attribute} from '../../models/attribute';
import {IonSelect, Platform, ToastController} from '@ionic/angular';
import {Post} from '../../models/post';
import {Skill} from '../../models/skill';
import {JsonDocument} from '../../models/json-document';
import {HttpResponse} from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {IOSFilePicker} from "@ionic-native/file-picker/ngx";
import {FileChooser} from "@ionic-native/file-chooser/ngx";
import { File } from '@ionic-native/file/ngx';
import {FilePath} from "@ionic-native/file-path/ngx";



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  user: Offeror | Applicant;
  structure: Structure = {} as Structure;
  structureList: Structure[] = [];
  attributeList: Attribute[] = [];
  jsonDocuments: JsonDocument[] = [];
  post: Post = {} as Post;
  skillList: Skill[] = [];
  postSkillList: Skill[] = [];
  button = false;
  f: any;
  uri: string;
  private message: string;
  verfiedError = false;
  type: string;


  constructor(private routes: Router, private postService: PostService,  public toastController: ToastController,
  private camera: Camera, public platform: Platform, private filePicker: IOSFilePicker, private fileChooser: FileChooser,
              private file: File, private filePath: FilePath) {}

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null){
      this.routes.navigateByUrl('/login',{
        replaceUrl : true
      });      }
    else {
      if (this.user.type === 'offeror') {
        if (!(this.user as Offeror).verified) {
          this.verfiedError = true;
        }
        else{
          this.postService.findAllStructure(this.user.type).subscribe(
            response => {
              this.structureList = response;
            },
            error => {
              this.message = 'Si è verificato un errore, riprova';
              this.presentToast();
            }
          );
          this.postService.findAllSkill().subscribe(
            response => {
              this.skillList = response;
            },
            error => {
              this.message = 'Si è verificato un errore, riprova';
              this.presentToast();
            }
          );
        }
      }
      else if (this.user.type === 'applicant') {
        this.postService.findAllStructure(this.user.type).subscribe(
          response => {
            this.structureList = response;
          },
          error => {
            this.message = 'Si è verificato un errore, riprova';
            this.presentToast();
          }
        );

        this.postService.findAllSkill().subscribe(
          response => {
            this.skillList = response;
          },
          error => {
            this.message = 'Si è verificato un errore, riprova';
            this.presentToast();
          }
        );
      }
    }

  }

  showAttribute(structure: Structure) {
    this.structure = structure;
    this.attributeList = structure.attributeList;
    this.attributeList.forEach(
      attr => {
        if(attr.name != 'immagini' && attr.name!='curriculum') {
          this.jsonDocuments.push({
            nameAttribute: attr.name,
            value: null,
          });
        }
      });
  }

  onSubmit(structureSelect: IonSelect) {
    this.post.structure = this.structure;
    this.post.hide = false;
    this.post.jsonDocument = this.jsonDocuments;
    this.post.createdBy = this.user;
    this.post.skillList = this.postSkillList;
    this.post.pubblicationDate = new Date();
    if(this.post.skillList.length === 0 && (this.structure.name === 'job offer' || this.structure.name === 'job request')){
      this.message = 'Devi aggiunge almeno una skillpost';
      this.presentToast();
    }
    else{
      this.postService.createPost(this.post).subscribe(
        response  => {
          this.uploadFile(response)
          this.message = 'Post creato con successo';
          this.presentToast();
          this.attributeList = [];
          structureSelect.value=null;
          this.post = {} as Post;

        },
        error => {
          this.message = 'Si è verificato un errore, riprova';
          this.presentToast();
        });
    }

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 2000
    });
    toast.present();
  }


  addSkill(index: any) {
    this.button = false;
    this.postSkillList.unshift(this.skillList[index]);
    this.skillList.splice(index, 1);
  }

  enable() {
    this.button = true;
  }

  removeSkill(index: number) {
    this.skillList.unshift(this.postSkillList[index]);
    this.postSkillList.splice(index, 1);

  }

  uploadFile(idPost: number) {
    this.postService.update(this.f, idPost, this.type).subscribe(event => {
      console.log(event);
      if (event instanceof HttpResponse) {
        console.log('OK');
      }
    }, err => {
      console.log('Could not upload the file!');
      console.log(err.message);
    });
  }

  getPhotoFromLib() {
    this.type = "image"
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.f = 'data:image/jpeg;base64,' + imageData;
      console.log("OK");
    }, (err) => {
      console.log("ERROR", err);
    });
  }

  getFile() {
    this.type = "pdf";
    if(this.platform.is('ios')) {
      this.filePicker.pickFile()
        .then(uri => {
          console.log("ok");

          let correctPath = uri.substr(0, uri.lastIndexOf('/') + 1);
          let currentName = uri.substring(uri.lastIndexOf('/') + 1);
          console.log("correctPath:", "file:///"+correctPath);
          console.log("currentName:", currentName);
         this.file.readAsDataURL( "file:///" + correctPath, currentName)
            .then(data => {
              this.f = data;
              }
            )
            .catch(e => console.log("error read:", e));

        })
        .catch(err => console.log('Error', err));
    }
    else{
      this.fileChooser.open()
        .then(uri => {
          console.log(uri);
          this.filePath.resolveNativePath(uri)
            .then(filePath => {
              let correctPath = filePath.substring(0, filePath.lastIndexOf('/') + 1);
              let currentName = filePath.substring(filePath.lastIndexOf('/') + 1);
              console.log("correctPath:", correctPath);
              console.log("currentName:", currentName);
              this.file.readAsText(correctPath, currentName)
                .then( data => {

                  console.log(data);
                  this.f = data;
                })
                .catch(err => console.log("ERRORE", err))
            })
            .catch(err => console.log("Errore:", err));

        })
        .catch(e => console.log("Error:", e));
    }
  }
}
