import { FC } from "react";
import { TFirebaseUser } from "#/@types/users";

interface Props {
  user: TFirebaseUser;
  size?: number;
}

const UserAvatar: FC<Props> = ({ user, size }) => {
  if (!user) return null;

  const styles = {
    image: {},
    avatar: {},
  };

  if (size) {
    styles.image = { width: size + "px", height: size + "px" };
    styles.avatar = { ...styles.image, fontSize: size / 2.5 + "px" };
  }

  if (user.user_avatar)
    return (
      <img
        style={styles.image}
        className="shrink-0 rounded-full w-8 h-8 object-cover border border-gray-600"
        src={user.user_avatar}
        alt="User avatar"
      />
    );
  else
    return (
      <div
        style={styles.avatar}
        className="shrink-0 flex items-center justify-center w-8 h-8 text-sm text-white uppercase bg-indigo-500 rounded-full border border-gray-600"
      >
        {user.user_name[0]}
      </div>
    );
};

export default UserAvatar;
