import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default async function usernameExists(username: string) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !!querySnapshot.docs.length;
}
