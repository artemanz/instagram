import { TFirebaseUser } from "#/@types/users";
import AuthContext from "#/contexts/AuthContext";
import updateFollowing from "#/api/updateFollowing";
import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserAvatar from "../UI/UserAvatar";

interface Props {
  suggestion: TFirebaseUser;
}

const Suggestion: FC<Props> = ({ suggestion }) => {
  const { user, updateUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  const FollowToggleButton = () => {
    async function followHandler() {
      setFollowed(true);
      await updateFollowing("add", user, updateUser, suggestion);
    }

    return (
      <button
        disabled={followed}
        className="AppThinButton"
        type="button"
        onClick={followHandler}
      >
        Follow
      </button>
    );
  };

  return (
    <li className="flex items-center justify-between text-sm">
      <Link
        className="flex items-center gap-2"
        to={`/profile/${suggestion.user_name}`}
      >
        <UserAvatar user={suggestion} />
        <p className="font-bold">{suggestion.user_name}</p>
      </Link>

      <FollowToggleButton />
    </li>
  );
};

export default Suggestion;
