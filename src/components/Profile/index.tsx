import { TFirebaseUser } from "#/@types/users";
import AuthContext from "#/contexts/AuthContext";
import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../UI/Loading";
import getProfile from "./api/getProfile";
import ProfileData from "./ProfileData";
import ProfilePosts from "./ProfilePosts";

interface Props {}

const UserProfile: FC<Props> = () => {
  const params = useParams<{ username: string }>();
  const { user } = useContext(AuthContext);
  const isUserCurrentUser = params.username === user?.user_name;
  const [profile, setProfile] = useState<TFirebaseUser | null>(null);
  const [loading, setLoading] = useState(false);

  function getUserProfile() {
    (async function () {
      if (!isUserCurrentUser) {
        const fetchedUser = await getProfile(params.username || "");
        if (fetchedUser) {
          setProfile(fetchedUser);
        }
      } else {
        setProfile(user!);
      }
      setLoading(false);
    })();
  }

  useEffect(getUserProfile, [params]);
  if (!profile) return null;
  if (loading) return <Loading />;
  return (
    <>
      <ProfileData profile={profile} />
      <hr className="my-8" />
      <ProfilePosts profile={profile} />
    </>
  );
};

export default UserProfile;
