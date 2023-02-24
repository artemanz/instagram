import { TFirebaseUser } from "#/@types/users";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../firebase";

export default async function updateFollowing(
  action: "add" | "remove",
  currentUser: TFirebaseUser | null,
  updateCurrentUser: Dispatch<TFirebaseUser>,
  followedUser: TFirebaseUser
) {
  if (!currentUser) return;

  const currentUserRef = doc(db, "users", currentUser.user_name);
  const followedUserRef = doc(db, "users", followedUser.user_name);

  let currentUserFollowing = currentUser.following;

  switch (action) {
    case "add":
      if (!currentUserFollowing.includes(followedUser.user_name))
        currentUserFollowing.push(followedUser.user_name);

      await updateDoc(currentUserRef, {
        following: arrayUnion(followedUser.user_name),
      });
      await updateDoc(followedUserRef, {
        followers: arrayUnion(currentUser.user_name),
      });
      break;
    case "remove":
      currentUserFollowing = currentUserFollowing.filter(
        (f) => f !== followedUser.user_name
      );

      await updateDoc(currentUserRef, {
        following: arrayRemove(followedUser.user_name),
      });
      await updateDoc(followedUserRef, {
        followers: arrayRemove(currentUser.user_name),
      });
      break;
  }

  updateCurrentUser({
    ...currentUser,
    following: currentUserFollowing,
  });
}
