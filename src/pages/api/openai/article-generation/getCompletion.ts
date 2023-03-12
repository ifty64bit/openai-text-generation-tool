import { NextApiResponse } from "next";
import openai from "@/libs/openai";
import { ArticleRequest } from "types";

export default async function handler(
    req: ArticleRequest,
    res: NextApiResponse
) {
    try {
        const { title, outlines, tone } = req.body;
        console.log(title, outlines);
        
        const { data } = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Write a long eassay tittled ${title} with proper heading, ${
                outlines.length == 0 ? "" : outlines.join(",")
            } outline and description in ${tone} ans make it MarkDown format`,
            max_tokens: 1000,
            temperature: 1,
        });
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}
