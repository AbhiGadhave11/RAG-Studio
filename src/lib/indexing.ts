import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import 'dotenv/config';
import { QdrantClient } from "@qdrant/js-client-rest";


export async function storeFileEmbeddings(files: File[]) {
    try{
        const client = new QdrantClient({
            url: process.env.QDRANT_URL,
            apiKey: process.env.QDRANT_API_KEY,
            checkCompatibility: false,
        });
        const collections = await client.getCollections();
        if (collections.collections.find(c => c.name === "my_first_collection")) {
            await client.deleteCollection("my_first_collection");
        }
        const embeddings = new OpenAIEmbeddings({
            model: "text-embedding-3-large",
        });
        let allDocs: any[] = [];
        for(const file of files) {
            let loader;

            if (file.name.endsWith(".pdf")) {
                loader = new PDFLoader(file);
            } else if (file.name.endsWith(".txt")) {
                loader = new TextLoader(file);
            } else if (file.name.endsWith(".json")) {
                loader = new JSONLoader(file, "/texts"); 
                // "/texts" = JSON pointer → depends on structure
            } else if (file.name.endsWith(".csv")) {
                loader = new CSVLoader(file);
            } else {
                console.warn(`Unsupported file type: ${file.name}`);
                continue;
            }

            const docs = await loader.load();
            allDocs = allDocs.concat(docs);
        }

        const vectorStore = await QdrantVectorStore.fromDocuments(allDocs, embeddings, {
            url: process.env.QDRANT_URL!,
            apiKey: process.env.QDRANT_API_KEY,
            collectionName: "my_first_collection",
        });
        console.log("Indexing of documents completed successfully!");
    } catch(err) {
        console.log(err);
        throw new Error('Added while generate embedding');
    }
}
