import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import 'dotenv/config';
import OpenAI from "openai";

const client = new OpenAI();

export async function chat(userQuery: string) {
    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-large"
    });


    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: process.env.QDRANT_URL,
        apiKey: process.env.QDRANT_API_KEY,
        collectionName: "my_first_collection",
    });

    const vectorSearcher = vectorStore.asRetriever({
        k: 3
    });
    const relevantChunks = await vectorSearcher.invoke(userQuery);
    
    const SYSTEM_PROMPT = `
        You are an AI assistant who helps resolving user query based on the context
        available to you from a PDF file with the content and page number.

        Only ans based on the available context from file only.

        Context: 
        ${JSON.stringify(relevantChunks)}
    `;
    const response = await client.chat.completions.create({
        model: "gpt-4.1",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userQuery }
        ]
    });
    return response.choices[0].message.content;
}