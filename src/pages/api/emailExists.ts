import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default async function usernameExists(email: string) {
  const q = query(collection(db, "users"), where("emailAddress", "==", email));

  const querySnapshot = await getDocs(q);
  return !!querySnapshot.docs.length;
}
