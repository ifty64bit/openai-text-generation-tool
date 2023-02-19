import { NextApiRequest, NextApiResponse } from "next";
import openai from "@/libs/openai";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { title, outlines } = req.body;
        const { data } = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Write a long eassy tittled ${title} with proper heading, outline in MarkDown format`,
            max_tokens: 1000,
            temperature: 1,
        });
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}
