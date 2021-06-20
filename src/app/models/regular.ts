import {User} from './user';
import {Post} from './post';

export interface Regular extends User{
  address: string;
  banned: boolean;
  disabled: boolean;
  degree: string;
  interestedPostList: Post[];
  postList?: Post[];

}
