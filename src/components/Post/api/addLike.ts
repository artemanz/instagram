import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "#/firebase";
import { TFirebaseUser } from "#/@types/users";

export default async function addLike(
  userLiked: TFirebaseUser["user_name"],
  postId: string,
  liked: boolean
) {
  const ref = doc(db, "posts", postId);

  if (liked)
    await updateDoc(ref, {
      likes: arrayUnion(userLiked),
    });
  else
    await updateDoc(ref, {
      likes: arrayRemove(userLiked),
    });
}
