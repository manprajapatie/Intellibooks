
import OpenAI from "openai";

const openrouter = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

export const generateAIResponse = async (messages) => {
    try {
        const response = await openrouter.chat.completions.create({
            model: process.env.OPENROUTER_MODEL,
            messages,
            temperature: 0.1,
            max_tokens: 8000,
        });

        const content = response.choices[0]?.message?.content;

        if (!content) {
            throw new Error("AI returned an empty response.");
        }

        return content;
    } catch (error) {
        console.error("OpenRouter AI error:", error);
        throw new Error("Unable to generate AI response.", {
            cause: error,
        });
    }
};
