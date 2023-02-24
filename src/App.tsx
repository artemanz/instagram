import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TFirebaseUser } from "./@types/users";
import { Loading } from "./components";
import ROUTES from "./constants/routes";
import AuthContext, { signOutHandler } from "./contexts/AuthContext";
import { IsLoggedIn } from "./functions/redirects";
import useAuth from "./hooks/useAuth";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  const [user, setUser] = useAuth<TFirebaseUser>();
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AuthContext.Provider
          value={{ user, signOut: signOutHandler, updateUser: setUser }}
        >
          <Routes>
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <IsLoggedIn user={user}>
                  <Dashboard />
                </IsLoggedIn>
              }
            />
            <Route
              path={ROUTES.PROFILE}
              element={
                <IsLoggedIn user={user}>
                  <Profile />
                </IsLoggedIn>
              }
            />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </AuthContext.Provider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
