import { UserProfile } from "#/components";
import { FC } from "react";

import DefaultLayout from "./layout/default";

interface Props {}

const Profile: FC<Props> = () => {
  return (
    <DefaultLayout>
      <main className="mt-8 container">
        <UserProfile />
      </main>
    </DefaultLayout>
  );
};

export default Profile;
