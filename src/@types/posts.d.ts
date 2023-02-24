import { TFirebaseUser } from "./users";

export type TComment = { author: string; comment: string };

export type TPost = {
  id: string;
  author: TFirebaseUser;
  caption: string;
  comments: TComment[];
  date_created: number;
  image: string;
  likes: string[];
};
