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
import {IOSFilePicker} from '@ionic-native/file-picker/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';

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
  img: any[] = [];
  pdf: any = '';
  uri: string;
  verfiedError = false;
  private message: string;


  constructor(private routes: Router, private postService: PostService, public toastController: ToastController,
              private camera: Camera, public platform: Platform, private filePicker: IOSFilePicker, private fileChooser: FileChooser,
              private file: File, private filePath: FilePath) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user == null) {
      this.routes.navigateByUrl('/login', {
        replaceUrl: true
      });
    } else {
      this.postService.findAllStructureByUserType(this.user.type).subscribe(
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

  showAttribute(structure: Structure) {
    this.structure = structure;
    this.attributeList = structure.attributeList;
    this.attributeList.forEach(
      attr => {
        let name = '';
        if (attr.type === 'Image' || attr.type === 'pdf') {
          name = null;
        } else {
          name = attr.name;
        }
        this.jsonDocuments.push({
          nameAttribute: name,
          value: null,
        });

      });
  }

  onSubmit(structureSelect: IonSelect) {
    this.post.structure = this.structure;
    this.post.hide = false;
    this.post.jsonDocument = [];
    this.jsonDocuments.forEach(
      jd => {
        if (jd.nameAttribute !== null) {
          this.post.jsonDocument.push(jd);
          console.log('jd:', jd);
        }
      }
    );
    console.log(this.post.jsonDocument);
    this.post.createdBy = this.user;
    this.post.skillList = this.postSkillList;
    this.post.pubblicationDate = new Date();
    if (this.post.skillList.length === 0 && (this.structure.name === 'job offer' || this.structure.name === 'job request')) {
      this.message = 'Devi aggiunge almeno una skill al post';
      this.presentToast();
    } else {
      this.postService.createPost(this.post).subscribe(
        response => {
          this.img.forEach(
            i => {
              if (i !== '') {
                this.uploadFile(response, i, 'image');
              }
            }
          );
          if (this.pdf !== '') {
            this.uploadFile(response, this.pdf, 'pdf');

          }
          this.message = 'Post creato con successo';
          this.presentToast();
          this.attributeList = [];
          structureSelect.value = null;
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

  uploadFile(idPost: number, f: any, type: string) {
    this.postService.upload(f, idPost, type).subscribe(event => {
      console.log(event);
      if (event instanceof HttpResponse) {
        console.log('OK - 177');
      }
    }, err => {
      console.log('Could not upload the file! - 180');
      console.log(err.message);
    });
  }

  getPhotoFromLib() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.img.unshift('data:image/jpeg;base64,' + imageData);
      console.log('OK - 198');
    }, (err) => {
      console.log('ERROR - 200', err);
    });
  }

  getFile() {
    if (this.platform.is('ios')) {
      this.filePicker.pickFile()
        .then(uri => {
          console.log('ok');

          const correctPath = uri.substr(0, uri.lastIndexOf('/') + 1);
          const currentName = uri.substring(uri.lastIndexOf('/') + 1);
          console.log('correctPath:', 'file:///' + correctPath);
          console.log('currentName:', currentName);
          this.file.readAsDataURL('file:///' + correctPath, currentName)
            .then(data => {
                this.pdf = data;
              }
            )
            .catch(e => console.log('error read:', e));

        })
        .catch(err => console.log('Error', err));
    } else {
      this.fileChooser.open()
        .then(uri => {
          console.log(uri);
          this.filePath.resolveNativePath(uri)
            .then(filePath => {
              const correctPath = filePath.substring(0, filePath.lastIndexOf('/') + 1);
              const currentName = filePath.substring(filePath.lastIndexOf('/') + 1);
              console.log('correctPath:', correctPath);
              console.log('currentName:', currentName);
              this.file.readAsText(correctPath, currentName)
                .then(data => {
                  console.log(data);
                  this.pdf = data;
                })
                .catch(err => console.log('ERRORE', err));
            })
            .catch(err => console.log('Errore:', err));

        })
        .catch(e => console.log('Error:', e));
    }
  }
}
