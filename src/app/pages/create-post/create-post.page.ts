import { Component, OnInit } from '@angular/core';
import {Offeror} from '../../models/offeror';
import {Applicant} from '../../models/applicant';
import {Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {Structure} from '../../models/structure';
import {Attribute} from '../../models/attribute';
import {AttributeValue} from '../../models/attribute-value';
import {ToastController} from '@ionic/angular';
import {Post} from '../../models/post';
import {Skill} from '../../models/skill';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  user: Offeror | Applicant;
  structureTODELETE: Structure = {} as Structure;
  structure: Structure = {} as Structure;
  structureList: Structure[] = [];
  attributeList: Attribute[] = [];
  attributeValueList: AttributeValue[] = [];
  post: Post = {} as Post;
  skillList: Skill[] = [];
  postSkillList: Skill[] = [];
  button = false;
  private message: string;


  constructor(private routes: Router, private postService: PostService,  public toastController: ToastController) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if(this.user == null){
      this.routes.navigateByUrl('login');
    }
    else{}

    this.structureTODELETE = {description: 'prova1',
      id: 0,
      name: 'prova0',
      userType: 'offeror'
    };
    this.structureList.unshift(this.structureTODELETE);
    this.structureTODELETE = {description: 'prova1',
      id: 1,
      name: 'prova1',
      userType: 'offeror'
    };
    this.structureList.unshift(this.structureTODELETE);
    this.structureTODELETE = {description: 'prova1',
      id: 2,
      name: 'prova2',
      userType: 'offeror'
    };
    this.structureList.unshift(this.structureTODELETE);
    this.structureTODELETE = {description: 'prova1',
      id: 3,
      name: 'prova3',
      userType: 'offeror'
    };
    this.structureList.unshift(this.structureTODELETE);
    this.structureTODELETE = {description: 'prova1',
      id: 0,
      name: 'prova4',
      userType: 'offeror'
    };
  }

  showAttribute(structure: Structure) {
    this.structure = structure;
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
    this.post.structure = this.structure;
    this.post.hide = false;
    this.post.report = 0;
    this.post.jsonDocument = JSON.stringify(this.attributeValueList);
    this.post.createdBy = this.user;
    this.post.skillList = this.postSkillList;
    this.postService.createPost(this.post).subscribe(
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
}
