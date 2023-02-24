import AuthContext from "#/contexts/AuthContext";
import { Dispatch, FC, useContext, useEffect, useRef } from "react";
import Popup from "reactjs-popup";

interface Props {
  open: boolean;
  setOpen: Dispatch<boolean>;
}

const SignOutPopup: FC<Props> = ({ open, setOpen }) => {
  const { signOut } = useContext(AuthContext);
  const focusedButton = useRef<HTMLButtonElement>(null);

  function focusButton() {
    if (focusedButton.current) focusedButton.current.focus();
  }

  return (
    <Popup open={open} onClose={() => setOpen(false)} onOpen={focusButton}>
      <div className="space-y-8 px-16 py-8 rounded-2xl bg-white">
        <h3 className="font-bold text-center">Do you want to sign out?</h3>
        <div className="flex justify-center gap-8">
          <button className="UIButton" onClick={() => signOut()}>
            Yes
          </button>
          <button
            className="UIButton"
            ref={focusedButton}
            onClick={() => setOpen(false)}
          >
            No
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default SignOutPopup;
