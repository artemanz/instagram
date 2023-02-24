import { Dispatch, FC, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  PlusCircleIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon as LogoutIcon,
} from "#icons/outline";
import ROUTES from "#/constants/routes";
import AuthContext from "#/contexts/AuthContext";

interface Props {
  createPostTrigger: Dispatch<boolean>;
  signOutTrigger: Dispatch<boolean>;
}

const iconStyle = "flex flex-col items-center gap-1";

const MobileMenu: FC<Props> = ({ createPostTrigger, signOutTrigger }) => {
  const { user, signOut } = useContext(AuthContext);
  const mobileMenu = useRef<HTMLDivElement>(null);

  function addScreenPadding() {
    useEffect(() => {
      if (mobileMenu.current)
        document.body.style.paddingBottom =
          mobileMenu.current.clientHeight + "px";
      else document.body.style.paddingBottom = "";
    }, [mobileMenu]);
  }

  addScreenPadding();

  return (
    <div
      ref={mobileMenu}
      className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-900 text-gray-900 text-xs flex justify-around items-center z-10 py-2"
    >
      <Link className={iconStyle} to={ROUTES.DASHBOARD} aria-label="Dashboard">
        <HomeIcon className="w-6" />
        <p>Home</p>
      </Link>

      <button
        className={iconStyle}
        type="button"
        onClick={() => createPostTrigger(true)}
      >
        <PlusCircleIcon className="w-6" />
        <p>New post</p>
      </button>

      <button
        className={iconStyle}
        type="button"
        title="Sign Out"
        onClick={() => signOutTrigger(true)}
      >
        <LogoutIcon className="w-6 text-gray-900" />
        <p>Log Out</p>
      </button>

      <Link className={iconStyle} to={`/profile/${user!.user_name}`}>
        <UserCircleIcon className="w-6" />
        <p>Profile</p>
      </Link>
    </div>
  );
};

export default MobileMenu;
