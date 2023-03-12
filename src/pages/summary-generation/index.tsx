import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import CreateNewButton from "@/components/CreateNewButton";
import Modal from "@/components/Modal";
import MainLayout from "@/layouts/MainLayout";
import { auth, db } from "@/libs/firebase";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Summary } from "types";

type Props = {};

function SummaryGeneration({}: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [errorMessages, setErrorMessages] = useState<string>("");
    const [summaries, setSummaries] = useState<any[]>([]);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const data = await getDocs(
                    query(
                        collection(db, "summaries"),
                        where("createdBy", "==", auth.currentUser?.uid)
                    )
                );
                setSummaries(
                    data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    async function onClickGo() {
        if (title.length === 0) {
            setErrorMessages("Title is required");
            return;
        }

        try {
            const uid = nanoid();
            await setDoc(doc(db, "summaries", uid), {
                title: title,
                createdAt: new Date().toISOString(),
                createdBy: auth.currentUser?.uid,
            });
            router.push(`/summary-generation/summary/${uid}`);
        } catch (error) {
            console.error(error);
            setErrorMessages("Something went wrong");
        }
    }
    return (
        <MainLayout pageTitle="Summary Generation">
            <div className="w-full p-4 flex gap-4 flex-wrap content-start">
                {summaries.length === 0 ? (
                    <div className="text-center w-full">No Summary found</div>
                ) : (
                    summaries.map((summary: Summary) => (
                        <Link
                            key={summary.id}
                            href={`/summary-generation/summary/${summary.id}`}
                        >
                            <BlogCard
                                title={summary.title}
                                createdAt={new Date(
                                    summary.createdAt
                                ).toDateString()}
                            />
                        </Link>
                    ))
                )}
                <CreateNewButton onClick={() => setIsModalOpen(true)} />
            </div>
            <Modal
                title="Create New Summary"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div>
                    <div className="flex flex-col mb-2">
                        <div className="mt-4">
                            <label className="sr-only text-base text-gray-500">
                                Enter Title
                            </label>
                            <input
                                type="text"
                                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                placeholder="Enter Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <p className="text-error">{errorMessages}</p>
                    </div>
                    <Button className="ml-auto" onClick={onClickGo}>
                        Go
                    </Button>
                </div>
            </Modal>
        </MainLayout>
    );
}

export default SummaryGeneration;
