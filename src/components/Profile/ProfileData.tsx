import { TFirebaseUser } from "#/@types/users";
import AuthContext from "#/contexts/AuthContext";
import updateFollowing from "#/api/updateFollowing";
import { FC, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import UserAvatar from "../UI/UserAvatar";

interface Props {
  profile: TFirebaseUser;
}

const ProfileData: FC<Props> = ({ profile }) => {
  const params = useParams();
  const { user, updateUser } = useContext(AuthContext);
  const [following, setFollowing] = useState(
    profile.followers.includes(user!.user_name)
  );
  const isUserCurrentUser = params.username === user?.user_name;

  async function followClickHandler() {
    let action: "add" | "remove" = "add";
    if (following) action = "remove";
    await updateFollowing(action, user, updateUser, profile!);
    setFollowing((prev) => !prev);
  }

  return (
    <section className="flex items-center gap-6 md:ml-12">
      <UserAvatar user={profile} size={92} />
      <div className="space-y-3">
        <div className="flex gap-10 flex-wrap">
          <h1 className="text-xl font-bold">{profile.user_name}</h1>

          {!isUserCurrentUser && (
            <button
              className="AppButton bg-accent-2 px-2 hover:opacity-90 focus:opacity-90 active:opacity-90"
              onClick={followClickHandler}
            >
              {following ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        <div className="text-sm flex gap-x-10 gap-y-2 flex-wrap">
          <p>
            <span className="font-bold">{profile.followers.length}</span>{" "}
            followers
          </p>
          <p>
            <span className="font-bold">{profile.following.length}</span>{" "}
            following
          </p>
        </div>

        <p>{profile.full_name}</p>
      </div>
    </section>
  );
};

export default ProfileData;
