
import OpenAI from "openai";

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const generateEmbedding = async (text) => {
  if (!text || !text.trim()) {
    throw new Error("Text is required to generate an embedding.");
  }

  try {
    const response = await openrouter.embeddings.create({
      model: process.env.OPENROUTER_EMBEDDING_MODEL,
      input: text,
      encoding_format: "float",
    });

    const embedding = response.data[0].embedding;

    if (embedding.length !== 2048) {
      throw new Error(
        `Expected 2048 dimensions, received ${embedding.length}.`
      );
    }

    return embedding;
  } catch (error) {
    console.error("Embedding generation error:", error);
    throw new Error("Unable to generate document embedding.", {
      cause: error,
    });
  }
};
