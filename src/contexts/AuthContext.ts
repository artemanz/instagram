import { createContext, Dispatch } from "react";
import { TFirebaseUser } from "#/@types/users";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

interface IAuthContext {
  user: TFirebaseUser | null;
  updateUser: Dispatch<TFirebaseUser>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  signOut: () => {},
  updateUser: () => {},
});

export default AuthContext;

export function signOutHandler() {
  signOut(auth);
  window.location.reload();
}
