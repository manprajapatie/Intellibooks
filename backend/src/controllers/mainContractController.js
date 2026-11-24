import fs from "node:fs/promises";
import { generateEmbedding } from "../services/embeddingService.js";
import { saveEmbedding } from "../repositories/embeddingRepository.js";

import {
  createMainContract,
  findMainContract,
} from "../repositories/mainContractRepository.js";

import { extractDocumentText } from "../services/documentExtractionService.js";

export const uploadMainContract = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select a PDF file.",
      });
    }

    // Only one Main Contract is allowed.
    const existingContract = await findMainContract();

    if (existingContract.length > 0) {
      await fs.unlink(req.file.path).catch(() => { });

      return res.status(409).json({
        message: "A Main Contract already exists. Replace it instead.",
      });
    }

    // Extract text from the uploaded PDF.
    const sections = await extractDocumentText(req.file.path);

    if (!sections.length) {
      throw new Error("The PDF contains no readable text.");
    }

    const extractedText = sections
      .map((section) => `[${section.sectionName}]\n${section.text}`)
      .join("\n\n");
    const embedding = await generateEmbedding(extractedText);

    const mainContract = await createMainContract({
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      extractedText,
    });
    
    await saveEmbedding(
      "MAIN_CONTRACT",
      mainContract.id,
      embedding
    );

    return res.status(201).json({
      message: "Main Contract uploaded successfully.",
      mainContract: {
        id: mainContract.id,
        fileName: mainContract.fileName,
        fileSize: mainContract.fileSize,
        createdAt: mainContract.createdAt,
      },
      extraction: {
        totalSections: sections.length,
        totalCharacters: extractedText.length,
      },
    });
  } catch (error) {
    console.error("Main Contract upload error:", error);

    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => { });
    }

    return res.status(500).json({
      message: "Unable to upload the Main Contract.",
    });
  }
};