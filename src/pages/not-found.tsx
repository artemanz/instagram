import { FC } from "react";
import useTitle from "#/hooks/useTitle";

interface Props {}

const NotFound: FC<Props> = () => {
  useTitle("404: Page Not Found");
  return <main className="container">Not Found</main>;
};

export default NotFound;
