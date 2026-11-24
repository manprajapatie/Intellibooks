
import { db } from "../prisma/db.js";

export const saveDocumentChunks = async (contractId, sections) => {
    const chunks = sections.map((section) => ({
        contractId,
        content: section.text,
        pageNumber: section.pageNumber,
        sectionName: section.sectionName,
    }));

    if (chunks.length === 0) {
        throw new Error("No readable text was found in the document.");
    }

    return await db.orm.public.DocumentChunk.createAll(chunks);
};

export const updateContractStatus = async (contractId, status) => {
    return await db.orm.public.Contract
        .where({ id: contractId })
        .update({ status });
};
