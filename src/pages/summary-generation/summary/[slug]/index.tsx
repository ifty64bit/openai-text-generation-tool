import Button from "@/components/Button";
import MainLayout from "@/layouts/MainLayout";
import { auth, db, storage } from "@/libs/firebase";
import axios from "axios";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Summary } from "types";

type Props = {};

function Summary({}: Props) {
    const article = useRef<HTMLTextAreaElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<Summary>();

    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const data = await getDoc(
                    doc(db, "summaries", `${router.query.slug}`)
                );

                const summaryData = data.data();

                const result: Summary = {
                    title: summaryData?.title,
                    providedArticle: summaryData?.providedArticle,
                    summary: summaryData?.summary,
                    usage: summaryData?.usage,
                    createdBy: summaryData?.createdBy,
                };
                setResult(result);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [router.query.slug]);

    async function onClickGenerate() {
        try {
            if (!article.current!.value) return alert("Please enter article");
            setLoading(true);

            const { data } = await axios.post(
                "/api/openai/summary-generation/getCompletion",
                {
                    article: article.current!.value,
                }
            );

            await updateDoc(doc(db, "summaries", `${router.query.slug}`), {
                providedArticle: article.current!.value,
                summary: data?.choices[0].text,
                usage: data?.usage,
            });
            setResult({
                ...result!,
                summary: data.choices[0].text,
                usage: data?.usage,
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <MainLayout pageTitle="Generate Summary">
            <div className="w-full flex gap-8 p-4">
                <div className="w-1/2  space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg">Enter Article</h3>
                    </div>
                    <textarea
                        className="w-full h-[85%] p-2 border rounded resize-none"
                        ref={article}
                        defaultValue={result?.providedArticle}
                    />
                    <Button onClick={onClickGenerate} isLoading={loading}>
                        Generate
                    </Button>
                </div>
                <div className="w-1/2 space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg">Summary</h3>
                    </div>
                    <p className="w-full h-[85%] p-2 border rounded resize-none bg-white">
                        {result?.summary ? result?.summary : ""}
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}

export default Summary;
