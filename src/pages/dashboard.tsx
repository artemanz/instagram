import { FC, useContext, useState } from "react";
import { Loading, Sidebar, Timeline } from "#/components";
import AuthContext from "#/contexts/AuthContext";
import useTitle from "#/hooks/useTitle";
import DefaultLayout from "./layout/default";

interface Props {}

const Dashboard: FC<Props> = () => {
  const { user } = useContext(AuthContext);

  useTitle("Instagram");
  if (!user) return <Loading />;

  const Main = () => (
    <main className="col-span-2 lg:col-span-1 justify-self-center">
      <Timeline />
    </main>
  );

  return (
    <DefaultLayout>
      <div className="container grid grid-cols-[3fr_1fr] mt-8 gap-8 items-start">
        <Main />
        <Sidebar />
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
