
import pool from "../config/pgPool.js";

export const saveEmbedding = async (sourceType, sourceId, embedding) => {
  const vector = `[${embedding.join(",")}]`;

  const query = `
    INSERT INTO "DocumentEmbedding"
      ("sourceType", "sourceId", embedding)
    VALUES ($1, $2, $3::vector)
    ON CONFLICT ("sourceType", "sourceId")
    DO UPDATE SET
      embedding = EXCLUDED.embedding,
      "createdAt" = CURRENT_TIMESTAMP
    RETURNING id, "sourceType", "sourceId";
  `;

  const result = await pool.query(query, [
    sourceType,
    sourceId,
    vector,
  ]);

  return result.rows[0];
};
