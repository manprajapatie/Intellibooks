import "dotenv/config";
import { generateAIResponse } from "../services/aiService.js";

const testAI = async () => {
    try {
        const response = await generateAIResponse([
            {
                role: "user",
                content: "Explain in one sentence what a contract termination clause means.",
            },
        ]);

        console.log("AI response:");
        console.log(response);
    } catch (error) {
        console.error("AI test failed:", error.message);
    }
};

testAI();