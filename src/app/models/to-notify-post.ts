import {User} from "./user";
import {Post} from "./post";
import {Regular} from "./regular";

export interface ToNotifyPost {
  id: number;
  post: Post;
  users: Regular[];
}
