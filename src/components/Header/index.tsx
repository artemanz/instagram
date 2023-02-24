import { Dispatch, FC, useContext } from "react";
import { Link } from "react-router-dom";
import ROUTES from "#/constants/routes";
import AuthContext from "#/contexts/AuthContext";
import { Logo } from "#/assets/images";
import {
  HomeIcon,
  ArrowRightOnRectangleIcon as LogoutIcon,
  PlusCircleIcon,
} from "#icons/outline";
import UserAvatar from "../UI/UserAvatar";

interface Props {
  createPostTrigger: Dispatch<boolean>;
  signOutTrigger: Dispatch<boolean>;
}

const Header: FC<Props> = ({ createPostTrigger, signOutTrigger }) => {
  const { user } = useContext(AuthContext);

  function toggleCreateNewPostPopup() {
    createPostTrigger(true);
  }

  function confirmSignOut() {
    signOutTrigger(true);
  }

  return (
    <header className="hidden h-20 col-span-3 bg-white border-b border-gray-300 md:block sticky top-0 z-10">
      <h1 className="invisible w-0 h-0">Instagram</h1>
      <div className="container flex items-center justify-between h-full py-4">
        <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
          <img className="w-36" src={Logo} alt="Instagram" />
        </Link>

        <div className="flex items-center gap-4">
          <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
            <HomeIcon className="w-6 text-gray-900" />
          </Link>

          <button
            type="button"
            title="Add Post"
            onClick={toggleCreateNewPostPopup}
          >
            <PlusCircleIcon className="w-6 text-gray-900" />
          </button>
          <button type="button" title="Sign Out" onClick={confirmSignOut}>
            <LogoutIcon className="w-6 text-gray-900" />
          </button>
          <Link to={`/profile/${user!.user_name}`}>
            <UserAvatar user={user!} size={48} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
