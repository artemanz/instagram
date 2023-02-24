import {
  CreatePostPopup,
  Header,
  MobileMenu,
  SignOutPopup,
} from "#/components";
import { FC, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

const DefaultLayout: FC<Props> = ({ children }) => {
  const [createNewPostPopup, setCreateNewPostPopup] = useState(false);
  const [signOutPopup, setSignOutPopup] = useState(false);

  return (
    <div>
      <Header
        createPostTrigger={setCreateNewPostPopup}
        signOutTrigger={setSignOutPopup}
      />
      {children}

      <MobileMenu
        createPostTrigger={setCreateNewPostPopup}
        signOutTrigger={setSignOutPopup}
      />

      {/* Popups */}
      <SignOutPopup open={signOutPopup} setOpen={setSignOutPopup} />
      <CreatePostPopup
        open={createNewPostPopup}
        setOpen={setCreateNewPostPopup}
      />
    </div>
  );
};

export default DefaultLayout;
