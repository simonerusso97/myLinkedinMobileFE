import {Structure} from './structure';
import {Company} from './company';
import {Regular} from './regular';
import {Applicant} from './applicant';
import {Skill} from './skill';
import {JsonDocument} from './json-document';
import {Offeror} from './offeror';
import {Commento} from './commento';
import {Attached} from './attached';


export interface Post {
  id: number;
  hide: boolean;
  pubblicationDate: Date;
  name: string;
  structure: Structure;
  jsonDocument: JsonDocument[];
  skillList: Skill[];
  createdBy: Applicant | Offeror;
  commentList: Commento[];
  attachedList: Attached[];
}
