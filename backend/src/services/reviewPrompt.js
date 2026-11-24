import { REVIEW_CHECKLIST } from "../constants/reviewChecklist.js";

export const createReviewPrompt = (userContract, mainContract) => {
    return `
You are an expert contract analysis assistant.

Your task is to compare a USER CONTRACT against a MAIN CONTRACT.

The MAIN CONTRACT is only a reference document.
Do not assume that its clauses are legally correct or automatically apply to the USER CONTRACT.

Review these eight checklist items:
${REVIEW_CHECKLIST.map((item, index) => `${index + 1}. ${item}`).join("\n")}

For EVERY checklist item, return:

1. status:
   - "found"
   - "not found"
   - "unclear"

2. summary:
   - A one-line plain-English explanation of what the clause actually says.
   - If missing, write exactly: "Not found in the contract."
   - If unclear, explain briefly why it is unclear.

3. quote:
   - Exact word-for-word text copied from the USER CONTRACT.
   - Never invent or rewrite a quote.
   - Use null if the clause is missing or unclear.

4. fullClause:
   - The complete relevant clause copied from the USER CONTRACT.
   - Use null if missing or unclear.

5. pageNumber:
   - Page number if available, otherwise null.

6. sectionName:
   - Section name if available, otherwise null.

Also analyze the MAIN CONTRACT for the same checklist item:

7. referenceStatus:
   - "found"
   - "not found"
   - "unclear"

8. referenceSummary:
   - One-line plain-English explanation.
   - If missing, write exactly: "Not found in the contract."

9. referenceQuote:
   - Exact word-for-word text copied from the MAIN CONTRACT.
   - Use null if missing or unclear.

10. referenceFullClause:
    - Complete relevant clause copied from the MAIN CONTRACT.
    - Use null if missing or unclear.

11. referencePageNumber:
    - Page number if available, otherwise null.

12. referenceSection:
    - Section name if available, otherwise null.

13. matchStatus:
    - "match": both clauses are present and substantively consistent.
    - "mismatch": both clauses are present but materially differ.
    - "unclear": either clause is missing, unclear, or cannot be reliably compared.

IMPORTANT RULES:
- Do not invent contract terms, dates, parties, page numbers, or quotes.
- Do not treat similar wording as an exact quote.
- Do not assume a clause exists just because it is common in contracts.
- Distinguish checklist presence from comparison result.
- Return exactly eight findings, one for each checklist item.
- Return valid JSON only. Do not include Markdown or explanations outside JSON.
- A checklist or guideline describing what a clause should contain
  is NOT an actual contractual clause.
- Do not treat examples, hypothetical terms, or instructions
  as real contractual obligations.
- Mark a clause as "found" only when the document contains
  an actual contractual provision addressing that topic.
- If the document only describes what should be checked,
  mark it as "not found".
- Apply these rules to BOTH documents.

USER CONTRACT:
${userContract}

MAIN CONTRACT:
${mainContract}

Return this JSON structure:

{
  "findings": [
    {
      "checklistItem": "Parties",
      "status": "found",
      "summary": "The agreement is between Company A and Company B.",
      "quote": "Exact text from the contract.",
      "fullClause": "Complete clause text.",
      "pageNumber": 1,
      "sectionName": "1. Parties",
      "referenceStatus": "found",
      "referenceSummary": "The reference agreement identifies both parties.",
      "referenceQuote": "Exact reference text.",
      "referenceFullClause": "Complete reference clause.",
      "referencePageNumber": 1,
      "referenceSection": "1. Parties",
      "matchStatus": "match"
    }
  ]
}
`;
};