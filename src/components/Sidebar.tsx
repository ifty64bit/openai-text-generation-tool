import { useEffect, useState } from "react";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/libs/firebase";
import Link from "next/link";

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
            <div className="w-full flex flex-col items-center">
                {auth.currentUser?.photoURL ? (
                    <Image
                        src={auth.currentUser.photoURL}
                        alt={auth.currentUser?.displayName || "User"}
                    />
                ) : (
                    <BiUserCircle className="text-7xl" />
                )}
                <h3>{user?.firstName + " " + user?.lastName}</h3>
                <p>{user?.email}</p>
            </div>
            <hr className="border border-foreground" />
            <div className="mt-2">
                <ul className="">
                    <li className="hover:bg-primary-light hover:text-background px-2 py-4 font-semibold transition-colors duration-300">
                        <Link href={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="hover:bg-primary-light hover:text-background px-2 py-4 font-semibold transition-colors duration-300">
                        <Link href={"/profile"}>Profile</Link>
                    </li>
                    <li
                        className="hover:bg-primary-light hover:text-error-light px-2 py-4 font-semibold text-error transition-colors duration-300"
                        onClick={() => auth.signOut()}
                    >
                        Logout
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;
