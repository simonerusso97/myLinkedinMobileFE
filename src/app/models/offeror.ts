import {Regular} from './regular';
import {Company} from './company';

export interface Offeror extends Regular{
  position: string;
  verified?: boolean;
  company: Company;


}

