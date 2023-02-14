import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase";

type Props = {};

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("This Field is Required"),
    password: Yup.string().required("This Field is Required"),
});

function Login({}: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<string>("");

    const router = useRouter();

    return (
        <main className="w-screen min-h-screen flex justify-center items-center">
            <div className="space-y-4">
                <div>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={async (values) => {
                            setErrorMessages("");
                            setIsLoading(true);
                            try {
                                const user = await signInWithEmailAndPassword(
                                    auth,
                                    values.email,
                                    values.password
                                );
                                if (user?.user) {
                                    router.push("/dashboard");
                                }
                                setIsLoading(false);
                            } catch (error: any) {
                                console.error(error.code);
                                if (error.code === "auth/user-not-found") {
                                    setErrorMessages(
                                        "Invalid Email or Password"
                                    );
                                }
                                setIsLoading(false);
                            }
                        }}
                    >
                        {({ values, errors, setFieldValue }) => (
                            <Form className="text-center space-y-4">
                                <div className="flex flex-col gap-2 text-center">
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
                                    <p className="text-error">{errors.email ? errors.email : ""}</p>
                                </div>
                                <div className="flex flex-col gap-2 text-center">
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
                                        {errors.password ? errors.password : ""}
                                    </p>
                                </div>
                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    className="mx-auto"
                                >
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <form className="text-center space-y-4"></form>
                </div>
                <div className="flex justify-center">
                    <button className="flex justify-center items-center gap-4 w-40 h-10 bg-white border hover:shadow-lg transition-all duration-300 text-xl rounded-lg">
                        <FcGoogle className="text-2xl" /> Google
                    </button>
                </div>
                <div>
                    <p className="text-center text-error font-semibold">
                        {errorMessages}
                    </p>
                </div>
                <div>
                    <p>
                        Dont Have an Account?{" "}
                        <Link
                            href={"/signup"}
                            className="font-bold text-primary"
                        >
                            SignUp Now!
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Login;
