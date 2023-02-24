import { db } from "#/firebase";
import { collection, getCountFromServer } from "firebase/firestore";

export default async function countPosts() {
  const coll = collection(db, "posts");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
}
