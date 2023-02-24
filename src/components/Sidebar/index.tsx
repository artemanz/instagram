import { FC, useContext } from "react";
import AuthContext from "#/contexts/AuthContext";
import Suggestions from "../Suggestions";
import User from "./User";

interface Props {}

const Sidebar: FC<Props> = () => {
  const { user } = useContext(AuthContext);

  return (
    <aside className="hidden lg:block min-w-[360px] p-6 justify-self-end bg-white rounded-xl border border-gray-300 space-y-6 sticky top-24">
      <User user={user} />
      <Suggestions />
    </aside>
  );
};

export default Sidebar;
