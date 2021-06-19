import { Component, OnInit } from '@angular/core';
import {Offeror} from '../../models/offeror';
import {Applicant} from '../../models/applicant';
import {Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {Structure} from '../../models/structure';
import {Attribute} from '../../models/attribute';
import {AttributeValue} from '../../models/attribute-value';
import {ToastController} from '@ionic/angular';


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
  attributeValueList: AttributeValue[] = [];
  private message: string;


  constructor(private routes: Router, private postService: PostService,  public toastController: ToastController) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null){
      this.routes.navigateByUrl('login');
    }
  }

  ngOnInit() {
    this.structure = {description: 'prova1',
      id: 0,
      name: 'prova0',
      userType: 'offeror'
    };
    this.structureList.unshift(this.structure);
    this.structure = {description: 'prova1',
      id: 1,
      name: 'prova1',
      userType: 'offeror'
    };
    this.structureList.unshift(this.structure);
    this.structure = {description: 'prova1',
      id: 2,
      name: 'prova2',
      userType: 'offeror'
    };
    this.structureList.unshift(this.structure);
    this.structure = {description: 'prova1',
      id: 3,
      name: 'prova3',
      userType: 'offeror'
    };
    this.structureList.unshift(this.structure);
    this.structure = {description: 'prova1',
      id: 0,
      name: 'prova4',
      userType: 'offeror'
    };
  }

  showAttribute(structure: Structure) {
    this.attributeList = structure.attributeList;
    this.attributeList.forEach(
      attr => {
        this.attributeValueList.unshift({
          name: '',
          value: null,
        }) ;
      });
  }

  onSubmit() {
    this.postService.createPost(JSON.stringify(this.attributeValueList)).subscribe(
      response  => {
        this.routes.navigateByUrl('tabs');
      },
      error => {
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
}
