import { TComment, TPost } from "#/@types/posts";
import { TFirebaseUser } from "#/@types/users";
import { db } from "#/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export default async function addComment(
  commentAuthor: TFirebaseUser["user_name"],
  post: TPost,
  commentText: TComment["comment"]
): Promise<void> {
  const postRef = doc(db, "posts", post.id);

  await updateDoc(postRef, {
    comments: arrayUnion({
      author: commentAuthor,
      comment: commentText,
    }),
  });
}
