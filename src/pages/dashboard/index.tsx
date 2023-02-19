import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "@/libs/firebase";
import MainLayout from "@/layouts/MainLayout";
import BlogCard from "@/components/BlogCard";
import CreateNewButton from "@/components/CreateNewButton";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import {
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
    collection,
} from "firebase/firestore";
import Link from "next/link";

type Props = {};

function Dashboard({}: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [errorMessages, setErrorMessages] = useState<string>("");
    const [blogs, setBlogs] = useState<any[]>([]);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const data = await getDocs(
                    query(
                        collection(db, "articles"),
                        where("createdBy", "==", auth.currentUser?.uid)
                    )
                );
                setBlogs(
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
        const data = await getDoc(doc(db, "articles", title));
        if (data.exists()) {
            setErrorMessages("Title already exists");
            return;
        } else {
            try {
                await setDoc(doc(db, "articles", title), {
                    createdAt: new Date().toISOString(),
                    createdBy: auth.currentUser?.uid,
                });
                router.push(`/article/${title}`);
            } catch (error) {
                console.error(error);
                setErrorMessages("Something went wrong");
            }
        }
    }
    return (
        <MainLayout>
            <div className="p-4 flex gap-4 flex-wrap ">
                {blogs.length === 0 ? (
                    <div className="text-center">No blogs found</div>
                ) : (
                    blogs.map((article) => (
                        <Link key={article.id} href={`/article/${article.id}`}>
                            <BlogCard
                                title={article.title}
                                createdAt={new Date(
                                    article.createdAt
                                ).toDateString()}
                            />
                        </Link>
                    ))
                )}
                <CreateNewButton onClick={() => setIsModalOpen(true)} />
            </div>
            <Modal
                title="Create New Blog"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div>
                    <div className="flex flex-col mb-2">
                        <label>Enter Title</label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            className="border p-1 rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
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

export default Dashboard;
