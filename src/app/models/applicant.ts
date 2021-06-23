import {Regular} from './regular';
import {Post} from './post';


export interface Applicant extends Regular{
  candidationList: Post[];
  commentList: Comment[];
}
