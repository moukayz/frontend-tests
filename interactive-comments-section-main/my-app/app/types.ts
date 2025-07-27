export interface RawUser {
  image: string;
  username: string;
}
export interface RawComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: RawUser;
  replyingTo?: string | null;
  rootCommentId?: number | null;
}
