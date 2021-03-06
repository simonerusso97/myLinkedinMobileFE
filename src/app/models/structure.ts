import {Post} from './post';
import {Attribute} from './attribute';

export interface Structure {
  id: number;
  name: string;
  description: string;
  userType: string;
  deletable: boolean;
  attributeList: Attribute[];
}
