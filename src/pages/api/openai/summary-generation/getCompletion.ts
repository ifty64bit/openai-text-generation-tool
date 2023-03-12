import { NextApiResponse } from "next";
import openai from "@/libs/openai";
import { SummaryRequest } from "types";

export default async function handler(
    req: SummaryRequest,
    res: NextApiResponse
) {
    try {
        const { article } = req.body;

        const { data } = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${article}
            Summarize the above article including key points and conclusion`,
            max_tokens: 1000,
            temperature: 1,
        });
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}
