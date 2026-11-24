import "dotenv/config";

import { findMainContract } from "../repositories/mainContractRepository.js";
import { generateEmbedding } from "../services/embeddingService.js";
import { saveEmbedding } from "../repositories/embeddingRepository.js";
import pool from "../config/pgPool.js";

const runTest = async () => {
  try {
    const contracts = await findMainContract();

    if (!contracts || contracts.length === 0) {
      throw new Error("No Main Contract found.");
    }

    const mainContract = contracts[0];

    console.log("Main Contract found:", mainContract.fileName);
    console.log("Generating embedding...");

    const embedding = await generateEmbedding(
      mainContract.extractedText
    );

    const result = await saveEmbedding(
      "MAIN_CONTRACT",
      mainContract.id,
      embedding
    );

    console.log("Main Contract embedding saved!");
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await pool.end();
  }
};

runTest();