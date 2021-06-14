import {Regular} from './regular';
import {Post} from './post';


export interface Applicant extends Regular{
  // TODO: commentList?: Comment;
  candidationList?: Post[];
}
