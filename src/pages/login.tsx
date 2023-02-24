import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FC, FormEventHandler, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IphoneWithProfile, Logo } from "#/assets/images";
import ROUTES from "#/constants/routes";
import useTitle from "#/hooks/useTitle";
import { auth } from "#/firebase";
import AuthContext from "#/contexts/AuthContext";

interface Props {}

const Login: FC<Props> = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isInvalid = !password || !email;

  const ErrorMessage = () => {
    if (!error) return null;

    return <p className="mt-4 text-red-500 text-sm">{error}</p>;
  };

  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      if (error instanceof FirebaseError)
        switch (error.code) {
          case "auth/invalid-email":
            setError("User with current email does not exists.");
            break;
          case "auth/wrong-password":
            setError("Invalid password.");
            break;
          default:
            setError("Login failed.");
        }
      else setError("Unknown error.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) navigate(ROUTES.DASHBOARD);
  }, [user]);
  useTitle("Login - Instagram");
  return (
    <main className="bg-gray-lightest">
      <div className="container flex items-center justify-center min-h-screen gap-4 mx-auto">
        <div className="hidden md:flex justify-end">
          <img className="w-[400px]" src={IphoneWithProfile} alt="" />
        </div>

        <div className="flex-1 max-w-sm space-y-4">
          <form
            onChange={() => setError("")}
            onSubmit={handleLogin}
            className="flex flex-col items-center pt-8 bg-white pb-8 rounded-2xl ring-1 ring-gray-200"
            method="POST"
          >
            <img className="w-1/2 mt-2 mb-4" src={Logo} alt="Instagram" />

            <fieldset className="flex flex-col items-center w-full space-y-4">
              <input
                className="w-9/12 AppInput"
                type="text"
                aria-label="Enter your email address"
                placeholder="Email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
              <input
                className="w-9/12 AppInput"
                type="password"
                aria-label="Enter your password"
                placeholder="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </fieldset>

            <input
              disabled={isInvalid || loading}
              className="w-9/12 py-2 mt-6 text-lg bg-sky-600 enabled:hover:bg-sky-700 enabled:focus:bg-sky-700 AppButton"
              type="submit"
              value={loading ? "Loading..." : "Log In"}
            />

            <ErrorMessage />

            <p className="text-sm mt-4 text-gray-500">
              Don't have an account?{" "}
              <Link
                className="font-bold text-sky-600 hover:underline focus:underline"
                to={ROUTES.SIGN_UP}
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
