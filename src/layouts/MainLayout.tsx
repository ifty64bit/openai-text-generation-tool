import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import React from "react";

type Props = {
    pageTitle: string;
    children: React.ReactNode;
};

function MainLayout({ pageTitle, children }: Props) {
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <main className="flex gap-2">
                <div className="h-screen shrink-0">
                    <Sidebar />
                </div>
                <>{children}</>
            </main>
        </>
    );
}

export default MainLayout;
