import { Role } from '../role.model'; 

export interface UserPatchRequest {
  username?: string;
  email?: string;
  password?: string;
  role?: Role;
  bio?: string;
  firstname?: string;
  lastname?: string;
}
