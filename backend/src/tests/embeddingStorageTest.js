
import "dotenv/config";
import { randomUUID } from "node:crypto";

import { generateEmbedding } from "../services/embeddingService.js";
import { saveEmbedding } from "../repositories/embeddingRepository.js";
import pool from "../config/pgPool.js";

const testEmbeddingStorage = async () => {
  try {
    const sampleText =
      "Either party can terminate this agreement with 30 days written notice.";

    console.log("Generating embedding...");

    const embedding = await generateEmbedding(sampleText);

    console.log("Embedding dimensions:", embedding.length);

    // Generate a temporary ID for testing.
    const testContractId = randomUUID();

    console.log("Saving embedding to PostgreSQL...");

    const savedRecord = await saveEmbedding(
      "USER_CONTRACT",
      testContractId,
      embedding
    );

    console.log("Embedding saved successfully!");
    console.log(savedRecord);
  } catch (error) {
    console.error("Embedding storage test failed:", error);
  } finally {
    await pool.end();
  }
};

testEmbeddingStorage();
