import type { TFirebaseUser } from "#/@types/users";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import UserAvatar from "../UI/UserAvatar";

interface Props {
  author: TFirebaseUser | null;
}

const Author: FC<Props> = ({ author }) => {
  return (
    <div className="self-start p-4">
      {author ? (
        <Link
          to={`/profile/${author.user_name}`}
          className="flex items-center gap-2 "
        >
          <UserAvatar user={author} />
          <p className="font-bold">{author.user_name}</p>
        </Link>
      ) : (
        <Skeleton width={120} height={40} />
      )}
    </div>
  );
};

export default Author;
