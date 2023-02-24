import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import type { Dispatch } from "react";
import { firebase, auth, db } from "#/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function useAuth<T>(): [T, Dispatch<T>] {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")!));

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const q = query(
          collection(db, "users"),
          where("email", "==", authUser.email)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        });
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    });
  }, [firebase]);

  return [user, setUser];
}
