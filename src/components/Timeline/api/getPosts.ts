import { TPost } from "#/@types/posts";
import { db } from "#/firebase";
import {
  collection,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";

let lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;
const downloadedPostsIds: string[] = [];

export default async function getPosts(limitNumber = 2): Promise<TPost[]> {
  const q = lastVisible
    ? query(
        collection(db, "posts"),
        orderBy("date_created"),
        startAfter(lastVisible),
        limit(limitNumber)
      )
    : query(
        collection(db, "posts"),
        orderBy("date_created"),
        limit(limitNumber)
      );

  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs.filter(
    (doc) => !downloadedPostsIds.includes(doc.id)
  );
  lastVisible = docs[querySnapshot.docs.length - 1];

  const p = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data: any = doc.data();
      const author = await getDoc(data.author);
      data.author = author.data();
      downloadedPostsIds.push(doc.id);
      return {
        ...data,
        id: doc.id,
        date_created: data.date_created.toDate(),
      } as TPost;
    })
  );

  return p;
}
