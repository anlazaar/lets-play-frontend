import { UserPublicProfileDTO } from '../USER/UserPublicProfileDTO';
import { CommentResponse } from '../COMMENT/CommentResponse';

export interface PostResponse {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: string;
  createdAt: string;
  updatedAt: string | null;

  author: UserPublicProfileDTO;

  likeCount: number;

  comments: CommentResponse[];
}
