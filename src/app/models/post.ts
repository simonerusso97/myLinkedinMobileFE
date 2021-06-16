import {Structure} from './structure';
import {Company} from './company';
import {Regular} from './regular';
import {Applicant} from './applicant';
import {Skill} from './skill';

export interface Post {
  id: number;
  hide: boolean;
  pubblicationDate: Date;
  report: number;
  name: string;
  structure: Structure;
  //TODO: togliere ?
  jsonDocument?: string;
  company: Company;
  interestedUserList?: Regular[];
  candidationUserList?: Applicant[];
  skillList?: Skill[];
  createdBy: Regular;
}
