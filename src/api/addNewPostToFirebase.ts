import { TPost } from "#/@types/posts";
import { TFirebaseUser } from "#/@types/users";
import { db, storage } from "#/firebase";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  FieldValue,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type TFirebasePost = {
  author: DocumentReference<DocumentData>;
  caption: string;
  comments: [];
  date_created: FieldValue;
  image: string;
  likes: [];
};

async function uploadImage(image: string, author: string) {
  const imageRef = ref(storage, `photos/${author}`);
  await uploadString(imageRef, image, "data_url");
  return await getDownloadURL(imageRef);
}

export default async function addNewPostToFirebase(post: TPost) {
  const image: string = await uploadImage(post.image, post.author.user_name);
  const newPost: TFirebasePost = {
    author: doc(collection(db, "users"), post.author.user_name),
    caption: post.caption,
    comments: [],
    likes: [],
    date_created: serverTimestamp(),
    image,
  };
  await addDoc(collection(db, "posts"), newPost);
}
