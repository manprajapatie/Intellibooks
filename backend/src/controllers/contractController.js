
import fs from "node:fs/promises";
import { db } from "../prisma/db.js";
import { findMainContract } from "../repositories/mainContractRepository.js";
import { reviewContractWithAI } from "../services/contractReviewService.js";
import { generateEmbedding } from "../services/embeddingService.js";
import { saveEmbedding } from "../repositories/embeddingRepository.js";


import {
  findContractsByUserId,
  findUserByClerkId,
  createContract,
  findContractById,
  deleteContractById,
} from "../repositories/contractRepository.js";

import {
  extractDocumentText,
} from "../services/documentExtractionService.js";

export const uploadContract = async (req, res) => {
  let contract;

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select a contract file.",
      });
    }

    // 1. Find the authenticated user
    const user = await findUserByClerkId(req.userId);

    if (!user) {
      await fs.unlink(req.file.path).catch(() => { });

      return res.status(404).json({
        message: "User not found. Please sign in again.",
      });
    }

    // 2. Extract complete document text
    const extractedSections = await extractDocumentText(req.file.path);

    if (!extractedSections.length) {
      throw new Error("The document contains no readable text.");
    }

    // Preserve page, paragraph or line references in stored text
    const extractedText = extractedSections
      .map((section) => {
        return `[${section.sectionName}]\n${section.text}`;
      })
      .join("\n\n");

    // Generate embedding from extracted contract text
    const embedding = await generateEmbedding(extractedText);

    // 3. Save contract and complete text in PostgreSQL
    contract = await createContract({
      userId: user.id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      extractedText,
      status: "processing",
    });

    // Save embedding using the newly created contract ID
    await saveEmbedding(
      "USER_CONTRACT",
      contract.id,
      embedding
    );

    console.log("Contract uploaded:", contract.id);
    console.log("Extracted characters:", extractedText.length);

    return res.status(201).json({
      message: "Contract uploaded and text extracted successfully.",
      contract: {
        id: contract.id,
        fileName: contract.fileName,
        fileSize: contract.fileSize,
        status: contract.status,
        createdAt: contract.createdAt,
      },
      extraction: {
        totalSections: extractedSections.length,
        totalCharacters: extractedText.length,
      },
    });

  } catch (error) {
    console.error("Contract processing error:", error);


    if (contract?.id) {
      await deleteContractById(contract.id).catch((deleteError) => {
        console.error("Contract cleanup error:", deleteError);
      });

      await fs.unlink(req.file.path).catch(() => { });
    } else if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => { });
    }

    return res.status(500).json({
      message: "Unable to upload or extract the contract.",
    });
  }
};




export const getUserContracts = async (req, res) => {
  try {
    const user = await findUserByClerkId(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please sign in again.",
      });
    }

    const contracts = await findContractsByUserId(user.id);

    const formattedContracts = contracts.map((contract) => ({
      id: contract.id,
      fileName: contract.fileName,
      fileSize: contract.fileSize,
      status: contract.status,
      createdAt: contract.createdAt,
    }));

    return res.status(200).json({
      message: "Contracts retrieved successfully.",
      contracts: formattedContracts,
    });
  } catch (error) {
    console.error("Get contracts error:", error);

    return res.status(500).json({
      message: "Unable to retrieve contracts.",
    });
  }
};



export const deleteUserContract = async (req, res) => {
  try {
    const { contractId } = req.params;

    // Find the logged-in user
    const user = await findUserByClerkId(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Find the requested contract
    const contract = await findContractById(contractId);

    //This ensures that a user cannot delete another user's contract simply by changing the contract ID in Postman
    if (!contract || contract.userId !== user.id) {
      return res.status(404).json({
        message: "Contract not found.",
      });
    }

    // Delete the database record
    await deleteContractById(contractId);

    // Delete the uploaded file from the server
    await fs.unlink(contract.filePath).catch((error) => {
      console.error("Unable to delete contract file:", error);
    });

    return res.status(200).json({
      message: "Contract deleted successfully.",
    });

  } catch (error) {
    console.error("Delete contract error:", error);

    return res.status(500).json({
      message: "Unable to delete contract.",
    });
  }
};

export const reviewUserContract = async (req, res) => {
  try {
    const { contractId } = req.params;

    // Find logged-in user
    const user = await findUserByClerkId(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find contract and verify ownership
    const contract = await findContractById(contractId);

    if (!contract || contract.userId !== user.id) {
      return res.status(404).json({ message: "Contract not found." });
    }

    if (!contract.extractedText) {
      return res.status(400).json({
        message: "Contract text is not available.",
      });
    }

    // Get Main Contract internally
    const mainContracts = await findMainContract();

    if (!mainContracts || mainContracts.length === 0) {
      return res.status(404).json({
        message: "Main Contract is not available.",
      });
    }

    const mainContract = mainContracts[0];

    // Generate AI findings
    const findings = await reviewContractWithAI(
      contract.extractedText,
      mainContract.extractedText
    );

    // Verify quotes against original contract text
    const verifiedFindings = findings.map((finding) => {
      if (finding.status === "not found") {
        return {
          ...finding,
          summary: "Not found in the contract.",
          quote: null,
          fullClause: null,
          pageNumber: null,
          sectionName: null,
        };
      }

      const validQuote =
        finding.status === "found" &&
        finding.quote &&
        finding.fullClause &&
        contract.extractedText.includes(finding.quote) &&
        contract.extractedText.includes(finding.fullClause);

      if (!validQuote) {
        return {
          ...finding,
          status: "unclear",
          summary: "The clause could not be verified in the contract.",
          quote: null,
          fullClause: null,
          pageNumber: null,
          sectionName: null,
        };
      }

      return finding;
    });

    // Save review
    const review = await db.orm.public.Review.create({
      contractId: contract.id,
      mainContractId: mainContract.id,
    });

    // Save findings
    for (const finding of verifiedFindings) {
      await db.orm.public.ReviewFinding.create({
        reviewId: review.id,
        checklistItem: finding.checklistItem,
        status: finding.status,
        summary: finding.summary,
        quote: finding.quote,
        fullClause: finding.fullClause,
        pageNumber: finding.pageNumber,
        sectionName: finding.sectionName,
        referenceStatus: "unclear",
        matchStatus: "unclear",
      });
    }

    return res.status(200).json({
      message: "Contract reviewed successfully.",
      reviewId: review.id,
      findings: verifiedFindings.map((finding) => ({
        checklistItem: finding.checklistItem,
        status: finding.status,
        summary: finding.summary,
        quote: finding.quote,
        fullClause: finding.fullClause,
        pageNumber: finding.pageNumber,
        sectionName: finding.sectionName,
      })),
    });

  } catch (error) {
    console.error("Contract review error:", error);

    return res.status(500).json({
      message: "Unable to review contract.",
    });
  }
};