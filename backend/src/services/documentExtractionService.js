
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import mammoth from "mammoth";

// Extract text from PDF
const extractPdf = async (filePath) => {
    const fileBuffer = await readFile(filePath);

    const pdf = await getDocument({
        data: new Uint8Array(fileBuffer),
        useSystemFonts: true,
    }).promise;

    const sections = [];

    try {
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const content = await page.getTextContent();

            const text = content.items
                .map((item) => ("str" in item ? item.str : ""))
                .join(" ")
                .replace(/\s+/g, " ")
                .trim();

            if (text) {
                sections.push({
                    text,
                    pageNumber,
                    sectionName: `Page ${pageNumber}`,
                });
            }
        }
    } finally {
    // Release PDF page resources
    await pdf.cleanup();
}

    return sections;
};

// Extract text from DOCX
const extractDocx = async (filePath) => {
    const result = await mammoth.extractRawText({
        path: filePath,
    });

    return result.value
        .split(/\n+/)
        .map((text, index) => ({
            text: text.trim(),
            pageNumber: null,
            sectionName: `Paragraph ${index + 1}`,
        }))
        .filter((section) => section.text.length > 0);
};

// Extract text from TXT
const extractTxt = async (filePath) => {
    const content = await readFile(filePath, "utf-8");

    return content
        .split(/\r?\n/)
        .map((text, index) => ({
            text: text.trim(),
            pageNumber: null,
            sectionName: `Line ${index + 1}`,
        }))
        .filter((section) => section.text.length > 0);
};

// Main extraction function
export const extractDocumentText = async (filePath) => {
    try {
        const extension = path.extname(filePath).toLowerCase();

        switch (extension) {
            case ".pdf":
                return await extractPdf(filePath);

            case ".docx":
                return await extractDocx(filePath);

            case ".txt":
                return await extractTxt(filePath);

            default:
                throw new Error("Unsupported document format.");
        }
    } catch (error) {
        console.error("Document extraction error:", error);
        throw new Error("Unable to extract text from the uploaded document.");
    }
};
