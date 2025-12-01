export interface UserPublicProfile {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface CommentResponse {
  id: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  author: UserPublicProfile;
}

export interface PostResponse {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: string;
  createdAt: string;
  updatedAt: string | null;

  author: UserPublicProfile;
  likedByCurrentUser: boolean;
  likeCount: number;

  comments: CommentResponse[];
}
