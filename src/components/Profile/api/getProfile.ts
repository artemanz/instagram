import { TFirebaseUser } from "#/@types/users";
import { db } from "#/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function getProfile(
  username: TFirebaseUser["user_name"]
): Promise<TFirebaseUser | null> {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("user_name", "==", username));
  const querySnap = await getDocs(q);
  let user = null;
  querySnap.forEach((doc) => (user = doc.data()));

  return user as TFirebaseUser | null;
}
