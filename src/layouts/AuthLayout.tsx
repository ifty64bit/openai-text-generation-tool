import { useEffect, useState } from "react";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { Triangle } from "react-loader-spinner";

type Props = {
    publicUrl: string[];
    children: React.ReactNode;
};

function AuthLayout({ publicUrl, children }: Props) {
    const [loader, setLoader] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoader(false);
            if (!user && !publicUrl.some((url) => router.pathname == url)) {
                router.push("/login");
            }
        });
        return () => unsubscribe();
    }, [router, publicUrl]);

    return (
        <>
            {loader ? (
                <Triangle
                    height="80"
                    width="80"
                    color="#6c757d"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass="w-screen h-screen flex justify-center items-center"
                    visible={true}
                />
            ) : (
                children
            )}
        </>
    );
}

export default AuthLayout;
