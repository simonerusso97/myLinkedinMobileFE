import {Post} from './post';

export interface Skill {
  id: number;
  name: string;
  description: string;
  postList: Post[];
}
