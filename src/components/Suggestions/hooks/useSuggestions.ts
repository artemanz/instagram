import { TFirebaseUser } from "#/@types/users";
import AuthContext from "#/contexts/AuthContext";
import getSuggestedProfiles from "../api/getSuggestedProfiles";
import { Dispatch, useContext, useEffect, useState } from "react";

export default function useSuggestions(): [
  TFirebaseUser[] | null,
  Dispatch<TFirebaseUser[]>
] {
  const { user } = useContext(AuthContext);
  const [profiles, setProfiles] = useState<TFirebaseUser[] | null>(null);

  useEffect(() => {
    async function getProfiles() {
      try {
        const response = await getSuggestedProfiles(user);
        setProfiles(response);
      } catch (error) {
        setProfiles([]);
      }
    }

    getProfiles();
  }, [user]);

  return [profiles, setProfiles];
}
