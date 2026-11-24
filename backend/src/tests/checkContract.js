import "dotenv/config";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

try {
  const result = await pool.query(`
    SELECT
      id,
      "fileName",
      "extractedText" IS NULL AS text_is_null,
      LENGTH("extractedText") AS text_length
    FROM "Contract"
  `);

  console.table(result.rows);
} catch (error) {
  console.error(error);
} finally {
  await pool.end();
}