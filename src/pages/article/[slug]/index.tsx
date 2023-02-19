import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from "@/components/Button";
import { auth, db } from "@/libs/firebase";
import { useRouter } from "next/router";
import { IResult } from "types";

type Props = {};

const storage = getStorage();

function NewBlogPost({}: Props) {
    const [title, setTitle] = useState<string>("");
    const [outline, setOutline] = useState<string[]>();
    const [result, setResult] = useState<IResult>();

    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const data = await getDoc(
                    doc(db, "articles", `${router.query.slug}`)
                );
                if (data.data()?.content) {
                    const fileRef = ref(
                        storage,
                        `mdFiles/${data.data()?.content}.md`
                    );

                    const url = await getDownloadURL(fileRef);
                    const response = await axios.get(url);

                    const result: IResult = {
                        title: data.data()?.title,
                        content: response.data,
                        usage: data.data()?.usage,
                        createdBy: data.data()?.createdBy,
                        outlines: data.data()?.outlines,
                    };
                    setResult(result);
                } else {
                    const result: IResult = {
                        title: data.data()?.title,
                        content: data.data()?.content,
                        usage: data.data()?.usage,
                        createdBy: data.data()?.createdBy,
                        outlines: data.data()?.outlines,
                    };
                    setResult(result);
                }
                if (data.data()?.title) {
                    setTitle(data.data()?.title);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [router.query.slug]);

    async function onClickGenerate() {
        try {
            const { data } = await axios.post("/api/openai/getCompletion", {
                title,
                outline,
            });

            const filename = new Date().getTime();
            const uploadedData = await uploadBytes(
                ref(storage, `mdFiles/${filename}.md`),
                new Blob([data.choices[0].text], {
                    type: "text/markdown",
                })
            );

            await updateDoc(doc(db, "articles", `${router.query.slug}`), {
                title,
                content: filename,
                createdBy: auth.currentUser?.uid,
                usage: data?.usage,
            });
            setResult({
                ...result,
                content: data.choices[0].text,
                usage: data?.usage,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MainLayout>
            <div className="p-4 flex gap-4">
                <section className="w-72 pr-4 border-r space-y-4">
                    <div className="flex flex-col">
                        <label>Enter Title</label>
                        <input
                            type="text"
                            className="p-1 border rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label>Enter Outline</label>
                        <input type="text" className="p-1 border rounded" />
                    </div>

                    <Button onClick={onClickGenerate}>Generate</Button>
                </section>
                <section className="pl-4">
                    <h3>Result</h3>
                    <div className="w-[45rem] h-[90vh] p-2 border rounded bg-white overflow-y-scroll">
                        <ReactMarkdown
                            components={{
                                h1: ({ node, ...props }) => (
                                    <h1
                                        className="text-4xl font-bold my-4"
                                        {...props}
                                    />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2
                                        className="text-3xl font-bold my-4"
                                        {...props}
                                    />
                                ),
                                h3: ({ node, ...props }) => (
                                    <h3
                                        className="text-2xl font-bold my-4"
                                        {...props}
                                    />
                                ),
                                h4: ({ node, ...props }) => (
                                    <h4
                                        className="text-xl font-bold my-4"
                                        {...props}
                                    />
                                ),
                                h5: ({ node, ...props }) => (
                                    <h5
                                        className="text-lg font-bold my-4"
                                        {...props}
                                    />
                                ),
                                h6: ({ node, ...props }) => (
                                    <h6
                                        className="text-base font-bold my-4"
                                        {...props}
                                    />
                                ),
                                p: ({ node, ...props }) => (
                                    <p className="my-4" {...props} />
                                ),
                            }}
                        >
                            {result?.content ? result.content : ""}
                        </ReactMarkdown>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}

export default NewBlogPost;
