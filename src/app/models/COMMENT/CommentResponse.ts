import { UserPublicProfileDTO } from '../USER/UserPublicProfileDTO';

export interface CommentResponse {
  id: string;
  text: string;
  createdAt: string;
  author: UserPublicProfileDTO;
}
