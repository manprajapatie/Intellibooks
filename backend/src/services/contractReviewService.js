import { generateAIResponse } from "./aiService.js";
import { createReviewPrompt } from "./reviewPrompt.js";

export const reviewContractWithAI = async (
  userContract,
  mainContract
) => {
  const prompt = createReviewPrompt(userContract, mainContract);

  const response = await generateAIResponse([
    {
      role: "system",
      content:
        "You are a careful contract analysis assistant. Return valid JSON only.",
    },
    {
      role: "user",
      content: prompt,
    },
  ]);

  const result = JSON.parse(response);

  return result.findings;
};