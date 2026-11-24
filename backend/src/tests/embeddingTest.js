import "dotenv/config";
import { generateEmbedding } from "../services/embeddingService.js";

const testEmbedding = async () => {
    try {
        const embedding = await generateEmbedding(
            "This agreement can be terminated by either party with 30 days written notice."
        );

        console.log("Embedding generated successfully!");
        console.log("Dimensions:", embedding.length);
        console.log("First 5 values:", embedding.slice(0, 5));
    } catch (error) {
        console.error(error.message);
    }
};

testEmbedding();