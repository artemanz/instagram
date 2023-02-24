import { TPost } from "#/@types/posts";
import { TFirebaseUser } from "#/@types/users";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "#/firebase";

export async function getPosts(
  userName: TFirebaseUser["user_name"]
): Promise<TPost[]> {
  const posts: TPost[] = [];
  const q = query(
    collection(db, "posts"),
    where("author", "==", doc(db, "users", userName))
  );
  const querySnapshot = await getDocs(q);

  const p = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const author = await getDoc(data.author);
      data.author = author.data();
      return data as TPost;
    })
  );

  posts.push(...p);

  return posts;
}
