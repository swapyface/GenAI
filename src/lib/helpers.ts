import "dotenv/config";
import * as parse from "pdf-parse";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";

interface SplitChunksOptions {
  chunkSize?: number;
  chunkOverlap?: number;
  pdfPath?: string;
}

interface VectorstoreOptions {
  documents: Document[];
}

/**
 * Loads a PDF and splits it into chunks for embedding.
 */
export async function loadAndSplitChunks({
  chunkSize = 1536,
  chunkOverlap = 128,
  pdfPath = "./data/MachineLearning-Lecture01.pdf",
}: SplitChunksOptions = {}): Promise<Document[]> {
  const loader = new PDFLoader(pdfPath);
  const rawDocs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
  });

  return splitter.splitDocuments(rawDocs);
}

/**
 * Initializes an in-memory vector store with the given documents.
 */
export async function initializeVectorstoreWithDocuments({
  documents,
}: VectorstoreOptions): Promise<MemoryVectorStore> {
  const embeddings = new OpenAIEmbeddings();
  const vectorstore = new MemoryVectorStore(embeddings);
  await vectorstore.addDocuments(documents);
  return vectorstore;
}
