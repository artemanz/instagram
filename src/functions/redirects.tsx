import { TFirebaseUser } from "#/@types/users";
import ROUTES from "#/constants/routes";
import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const IsLoggedIn: FC<{
  children: ReactNode;
  user: TFirebaseUser | null;
}> = ({ children, user }) => {
  if (!user) return <Navigate to={ROUTES.LOGIN} />;
  return <>{children}</>;
};
