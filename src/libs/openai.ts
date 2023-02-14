import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-jUYRpsr9hQjg0UbTBw1RO3sY",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;
