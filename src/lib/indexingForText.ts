import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { Document } from "@langchain/core/documents";
import 'dotenv/config';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


export async function storeTextEmbeddings(bigText: string) {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 50, // max size of each chunk
        chunkOverlap: 10, // keep overlap for context
    });
    const texts = await splitter.splitText(bigText);
    const client = new QdrantClient({
      url: process.env.QDRANT_URL!,
      apiKey: process.env.QDRANT_API_KEY,
    });

    // recreate collection if exists
    const collections = await client.getCollections();
    if (collections.collections.find(c => c.name === "my_first_collection")) {
      await client.deleteCollection("my_first_collection");
    }

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
    });

    // Wrap each string into a Document
    const docs = texts.map(
      (t, idx) =>
        new Document({
          pageContent: t,
          metadata: { id: idx },
        })
    );

    // Store in Qdrant
    await QdrantVectorStore.fromDocuments(docs, embeddings, {
      url: process.env.QDRANT_URL!,
      apiKey: process.env.QDRANT_API_KEY,
      collectionName: "my_first_collection",
    });

    console.log("Indexing of text documents completed successfully!");
  } catch (err) {
    console.error(err);
    throw new Error("Error while generating embeddings");
  }
}
