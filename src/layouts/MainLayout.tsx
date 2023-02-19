import Sidebar from "@/components/Sidebar";
import React from "react";

type Props = {
    children: React.ReactNode;
};

function MainLayout({ children }: Props) {
    return (
        <main className="flex gap-2">
            <div className="w-52 h-screen bg-primary pt-2 shrink-0">
                <Sidebar />
            </div>
            <>{children}</>
        </main>
    );
}

export default MainLayout;
