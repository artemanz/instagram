import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FC, FormEventHandler, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { TFirebaseUser } from "#/@types/users";
import { IphoneWithProfile, Logo } from "#/assets/images";
import ROUTES from "#/constants/routes";
import useTitle from "#/hooks/useTitle";
import { auth, db } from "#/firebase";
import emailExists from "./api/emailExists";
import usernameExists from "./api/usernameExists";
import AuthContext from "#/contexts/AuthContext";

interface Props { }

const Login: FC<Props> = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    // States
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isInvalid = !password || !email || !username;

    const ErrorMessage = () => {
        if (!error) return null;

        return <p className="mt-4 text-red-500 text-sm">{error}</p>;
    };

    const handleSignup: FormEventHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isUsernameExists = await usernameExists(username);
        const isEmailExists = await emailExists(email);
        try {
            if (isUsernameExists) {
                throw new FirebaseError(
                    "100",
                    "User with current username already exists."
                );
            }
            if (isEmailExists) {
                throw new FirebaseError(
                    "101",
                    "User with current email already exists."
                );
            }

            await createUserWithEmailAndPassword(auth, email, password);

            const newUser: TFirebaseUser = {
                date_created: Date.now(),
                email: email,
                user_name: username,
                full_name: fullname,
                followers: [],
                following: [],
                user_avatar: null,
            };

            await setDoc(doc(db, "users", newUser.user_name), newUser);
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/invalid-email":
                        setError("Invalid email.");
                        break;
                    default:
                        setError(error.message);
                }
            } else setError("Unknown error.");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (user) navigate(ROUTES.DASHBOARD);
    }, [user]);
    useTitle("Sign Up - Instagram");

    return (
        <main className="bg-gray-lightest">
            <div className="container flex items-center justify-center min-h-screen gap-4 mx-auto ">
                <div className="hidden md:flex justify-end">
                    <img className="w-[400px]" src={IphoneWithProfile} alt="" />
                </div>

                <div className="flex-1 max-w-sm space-y-4">
                    <form
                        onChange={() => setError("")}
                        onSubmit={handleSignup}
                        className="flex flex-col items-center pt-8 bg-white pb-8 rounded-2xl ring-1 ring-gray-200"
                        method="POST"
                    >
                        <img className="w-1/2 mt-2 mb-4" src={Logo} alt="Instagram" />

                        <fieldset className="flex flex-col items-center w-full space-y-4">
                            <input
                                className="w-9/12 AppInput"
                                type="text"
                                aria-label="Enter your user name"
                                placeholder="Username"
                                value={username}
                                onChange={({ target }) => setUsername(target.value)}
                            />
                            <input
                                className="w-9/12 AppInput"
                                type="text"
                                aria-label="Enter your full name"
                                placeholder="Full Name"
                                value={fullname}
                                onChange={({ target }) => setFullname(target.value)}
                            />
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
                            value={loading ? "Loading..." : "Sign Up"}
                        />

                        <ErrorMessage />

                        <p className="text-sm mt-4 text-gray-500">
                            Have an account?{" "}
                            <Link
                                className="font-bold text-sky-600 hover:underline focus:underline"
                                to={ROUTES.LOGIN}
                            >
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
