import {Applicant} from "./applicant";

export interface Commento {
  id: number;
  text: string;
  date: Date;
  applicant: Applicant;
  answerList: Commento[];
}
