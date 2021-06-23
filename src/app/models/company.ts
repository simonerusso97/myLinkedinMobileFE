import {Offeror} from './offeror';

export interface Company {
  id: number;
  name: string;
  password: string;
  sector: string;
  description: string;
  offerorList: Offeror[];
}
