import {Applicant} from "./applicant";

export interface Commento {
  id:number;
  text:String;
  date:Date;
  applicant:Applicant;
}
