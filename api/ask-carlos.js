// Import the Google AI library
import { GoogleGenerativeAI } from "@google/generative-ai";

// This is the Vercel Serverless Function handler
export default async function handler(request, response) {
  // First, check if this is a POST request. We only want to process AI requests.
  if (request.method !== 'POST') {
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Access your secret API key from the Environment Variables we set up in Vercel
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // Get the user's question and the context fact from the request sent by the frontend
    const { question, contextFact } = request.body;

    // For safety, check if we received a question
    if (!question) {
      return response.status(400).json({ error: "No question provided." });
    }

    // This is the "Prompt Engineering" part. We create a detailed prompt to guide the AI.
    const prompt = `You are C.A.R.L.O.S., a helpful and concise AI assistant. 
    Your knowledge is vast, but your responses are brief and to the point.
    A user is currently viewing the following fact: "${contextFact}"
    They have a follow-up question: "${question}"
    Please provide a brief, one or two-sentence answer to their question based on the context of the fact.`;

    // Select the AI model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Send the prompt to the AI and wait for the result
    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const text = aiResponse.text();

    // Send the AI's final answer back to the frontend
    response.status(200).json({
      answer: text
    });

  } catch (error) {
    // If anything goes wrong, send back an error message
    console.error("Error calling Google AI:", error);
    response.status(500).json({
      error: "Failed to get a response from the AI."
    });
  }
}

