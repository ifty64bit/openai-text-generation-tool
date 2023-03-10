import { DocumentData } from "firebase/firestore";
import { NextApiRequest } from "next";

export interface Article extends DocumentData {
    title: string;
    outlines: string[];
    content: string;
    createdBy: string;
    usage: {
        completion_tokens: number;
        prompt_tokens: number;
        total_tokens: number;
    };
}

export interface ArticleRequest extends NextApiRequest {
    body: {
        title: string;
        outlines: string[];
    };
}
