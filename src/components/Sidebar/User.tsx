import { TFirebaseUser } from "#/@types/users";
import { FC } from "react";
import { Link } from "react-router-dom";
import UserAvatar from "../UI/UserAvatar";

interface Props {
  user: TFirebaseUser | null;
}

const User: FC<Props> = ({ user }) => {
  return (
    <div>
      <Link
        className="flex items-center gap-4"
        to={`/profile/${user!.user_name}`}
      >
        <UserAvatar user={user!} size={48} />
        <div className="text-sm">
          <p className="font-bold">{user!.user_name}</p>
          <p>{user!.full_name}</p>
        </div>
      </Link>
    </div>
  );
};

export default User;
