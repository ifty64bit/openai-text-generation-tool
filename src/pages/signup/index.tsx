import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/libs/firebase";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";

type Props = {};

type State = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Name Too Short!")
        .max(50, "Name Too Long!")
        .required("This Field is Required"),
    lastName: Yup.string()
        .min(2, "Name Too Short!")
        .max(50, "Name Too Long!")
        .required("This Field is Required"),
    email: Yup.string()
        .email("Invalid email")
        .required("This Field is Required"),
    password: Yup.string().required("This Field is Required"),
});

const initialState: State = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

function Signup({}: Props) {
    const [errorMessages, setErrorMessages] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    async function handleGoogleSignup() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (user.metadata.creationTime === user.metadata.lastSignInTime) {
                try {
                    const docRef = await setDoc(doc(db, "users", user.uid), {
                        //displayname first word is first namr and rest is last name
                        firstName: user.displayName?.split(" ")[0] || "",
                        lastName:
                            user.displayName?.split(" ").slice(1).join(" ") ||
                            "",
                        email: user.email,
                    });
                    console.log("Document written with ID: ", docRef);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
            router.push("/dashboard");
            console.log(user);
        } catch (error: any) {
            console.log(error);
        }
    }
    return (
        <main className="w-screen min-h-screen flex justify-center items-center">
            <div className="space-y-4">
                <div>
                    <Formik
                        initialValues={{ ...initialState }}
                        validationSchema={SignupSchema}
                        onSubmit={async (values) => {
                            try {
                                setIsLoading(true);
                                const user =
                                    await createUserWithEmailAndPassword(
                                        auth,
                                        values.email,
                                        values.password
                                    );
                                await setDoc(doc(db, "users", user.user.uid), {
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    email: values.email,
                                });
                                router.push("/dashboard");
                                setIsLoading(false);
                            } catch (error: any) {
                                //SignUp Attempt Error
                                setErrorMessages(
                                    error?.code === "auth/email-already-in-use"
                                        ? "Email Already in Use"
                                        : "Something Went Wrong"
                                );
                                setIsLoading(false);
                            }
                        }}
                    >
                        {({ values, errors, setFieldValue }) => (
                            <Form className="grid grid-cols-2 grid-rows-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="border p-1 rounded-lg"
                                        value={values.firstName}
                                        onChange={(e) =>
                                            setFieldValue(
                                                "firstName",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p className="text-error">
                                        {errors.firstName}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="border p-1 rounded-lg"
                                        value={values.lastName}
                                        onChange={(e) =>
                                            setFieldValue(
                                                "lastName",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p className="text-error">
                                        {errors.lastName}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="border p-1 rounded-lg"
                                        value={values.email}
                                        onChange={(e) =>
                                            setFieldValue(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p className="text-error">{errors.email}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="border p-1 rounded-lg"
                                        value={values.password}
                                        onChange={(e) =>
                                            setFieldValue(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p className="text-error">
                                        {errors.password}
                                    </p>
                                </div>
                                <Button
                                    type="submit"
                                    className="col-span-2 justify-self-center"
                                    isLoading={isLoading}
                                >
                                    Signup
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="flex justify-center">
                    <button
                        className="flex justify-center items-center gap-4 w-40 h-12 bg-white border hover:shadow-lg transition-all duration-300 text-xl rounded-lg group"
                        onClick={handleGoogleSignup}
                    >
                        <FcGoogle className="text-2xl group-hover:animate-spin" />{" "}
                        Google
                    </button>
                </div>
                <div className="text-center">
                    <p className="text-error font-semibold">{errorMessages}</p>
                </div>
                <div className="text-center">
                    <p>
                        Already Have an Account?{" "}
                        <Link
                            href={"/login"}
                            className="font-bold text-primary"
                        >
                            Login Now!
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Signup;
