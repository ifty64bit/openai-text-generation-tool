import { useEffect, useState } from "react";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/libs/firebase";
import sidebar from "../config/sidebar";
import Link from "next/link";
import { RxExit } from "react-icons/rx";

type Props = {};
type User = {
    firstName: string;
    lastName: string;
    email: string;
};

function Sidebar({}: Props) {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        (async () => {
            if (auth.currentUser?.uid) {
                try {
                    const data = await getDoc(
                        doc(db, "users", auth.currentUser?.uid)
                    );
                    setUser(data.data() as User);
                } catch (e) {
                    console.log(e);
                }
            }
        })();
    }, []);
    return (
        <>
            <div className="flex overflow-hidden bg-white h-full">
                <div className="hidden md:flex md:flex-shrink-0">
                    <div className="flex flex-col w-64">
                        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-indigo-700 border-r">
                            <div className="flex flex-col items-center flex-shrink-0 px-4">
                                <a
                                    href="./index.html"
                                    className="px-8 text-left focus:outline-none"
                                >
                                    <h2 className="block p-2 text-xl font-medium tracking-tighter text-white transition duration-500 ease-in-out transform cursor-pointer hover:text-white">
                                        Project Name
                                    </h2>
                                </a>
                                <button className="hidden rounded-lg focus:outline-none focus:shadow-outline">
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                            clip-rule="evenodd"
                                        ></path>
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-col flex-grow px-4 mt-5">
                                <nav className="flex-1 space-y-1 bg-indigo-700">
                                    <ul>
                                        {sidebar.map((item, i) => (
                                            <li key={i}>
                                                <a
                                                    className="inline-flex items-center w-full px-4 py-2 mt-1 text-base text-white transition duration-500 ease-in-out transform bg-indigo-600 rounded-lg focus:shadow-outline"
                                                    href={item.route as string}
                                                >
                                                    {item.icon}
                                                    <span className="ml-4">
                                                        {" "}
                                                        {item.name}
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                        <li>
                                            <button
                                                className="inline-flex items-center w-full px-4 py-2 mt-1 text-base text-white transition duration-500 ease-in-out transform bg-red-600 rounded-lg focus:shadow-outline"
                                                onClick={() => auth.signOut()}
                                            >
                                                <RxExit />
                                                <span className="ml-4">
                                                    {" "}
                                                    Logout
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="flex flex-shrink-0 p-4 px-4 bg-indigo-600">
                                <a
                                    href="#"
                                    className="flex-shrink-0 block w-full group"
                                >
                                    <div className="flex items-center">
                                        <div>
                                            {auth.currentUser?.photoURL ? (
                                                <Image
                                                    src={
                                                        auth.currentUser
                                                            .photoURL
                                                    }
                                                    alt={
                                                        auth.currentUser
                                                            ?.displayName ||
                                                        "User"
                                                    }
                                                    width={50}
                                                    height={50}
                                                    className="rounded-full"
                                                />
                                            ) : (
                                                <BiUserCircle className="text-7xl" />
                                            )}
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-white">
                                                {user?.firstName +
                                                    " " +
                                                    user?.lastName}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 w-0 overflow-hidden">
                    <main className="relative flex-1 overflow-y-auto focus:outline-none">
                        <div className="py-6">
                            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                                <h1 className="text-lg text-neutral-600">
                                    Here is where you put your stuff
                                </h1>
                            </div>
                            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                                {/* <!-- Put your content here --> */}
                                <div className="py-4">
                                    <div className="rounded-lg bg-gray-50 h-96"></div>
                                </div>
                                {/* <!-- Do not cross the closing tag underneath this coment--> */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
