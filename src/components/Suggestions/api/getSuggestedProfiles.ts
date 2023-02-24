import { TFirebaseUser } from "#/@types/users";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "#/firebase";

export default async function getSuggestedProfiles(
  user: TFirebaseUser | null
): Promise<TFirebaseUser[]> {
  if (!user) return [];

  let data: TFirebaseUser[] = [];

  const querySnapshot = await getDoc(doc(db, "users", user.user_name));
  const followers = querySnapshot.data()?.followers;
  const following = querySnapshot.data()?.following;

  const q = query(
    collection(db, "users"),
    where("user_name", "in", followers),
    limit(5)
  );
  const users = await getDocs(q);

  users.forEach((doc) => data.push(doc.data() as TFirebaseUser));

  data = data.filter((user) => !following.includes(user.user_name));

  return data;
}
