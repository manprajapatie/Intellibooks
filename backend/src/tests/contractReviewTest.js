import "dotenv/config";
import pool from "../config/pgPool.js";
import { reviewContractWithAI } from "../services/contractReviewService.js";

const testReview = async () => {
    try {
        const userResult = await pool.query(`
      SELECT "extractedText"
      FROM "Contract"
      ORDER BY "createdAt" DESC
      LIMIT 1
    `);

        const mainResult = await pool.query(`
      SELECT "extractedText"
      FROM "MainContract"
      LIMIT 1
    `);

        if (!userResult.rows.length || !mainResult.rows.length) {
            throw new Error("Upload both contracts before testing.");
        }

        const findings = await reviewContractWithAI(
            userResult.rows[0].extractedText,
            mainResult.rows[0].extractedText
        );

        console.log("AI review completed!");
        console.log(JSON.stringify(findings, null, 2));
    } catch (error) {
        console.error("Review test failed:", error);
    } finally {
        await pool.end();
    }
};

testReview();