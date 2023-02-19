import { NextApiRequest, NextApiResponse } from 'next';
import openai from "@/libs/openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { data } = await openai.listEngines();
    res.status(200).json(data);
}
