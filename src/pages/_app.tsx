import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthLayout from "@/layouts/AuthLayout";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthLayout publicUrl={["/", "/login", "/signup"]}>
            <Component {...pageProps} />
        </AuthLayout>
    );
}
