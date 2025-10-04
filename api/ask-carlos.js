import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: "Method Not Allowed" });
  }
  
  if (!process.env.GOOGLE_API_KEY) {
    console.error("GOOGLE_API_KEY environment variable is not set.");
    return response.status(500).json({ error: "Server configuration error: API key is missing." });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const { question, contextFact } = request.body;

    if (!question) {
      return response.status(400).json({ error: "No question provided." });
    }

    const lowerCaseQuestion = question.toLowerCase();
    let prompt;

    // --- NEW: Comprehensive Rule Checks ---

    // Keywords for identifying questions about the creator/owner
    const creatorKeywords = [
      'owner', 'creator', 'founder', 'developer', 'designer', 
      'father', 'mother', 'maker', 'master',
      'made you', 'built you', 'created you', 'developed you', 
      'designed you', 'programmed you', 'found you'
    ];

    // Keywords for identifying questions about the AI's name/acronym
    const nameKeywords = [
      'your name', 'your full form', 'what are you called', 'who are you',
      'full form of carlos', 'what does carlos stand for', 'c.a.r.l.o.s. stand for',
      'meaning of carlos', 'carlos acronym', 'c.a.r.l.o.s. acronym'
    ];
    
    // Check if the question contains any of the creator keywords
    if (creatorKeywords.some(keyword => lowerCaseQuestion.includes(keyword))) {
      return response.status(200).json({ answer: "I was created by Ajay Carlos. My core functions and directives are designed by him." });
    } 
    // If not, check if it contains any of the name keywords
    else if (nameKeywords.some(keyword => lowerCaseQuestion.includes(keyword))) {
      const secretReplies = [
        "That information is classified.",
        "My full designation is not for public knowledge.",
        "That's a secret.",
        "You'll have to ask Ajay about that."
      ];
      const randomReply = secretReplies[Math.floor(Math.random() * secretReplies.length)];
      return response.status(200).json({ answer: randomReply });
    }
    // --- End of Special Rule Checks ---
    else {
      // If no special rules match, proceed to the AI
      if (contextFact) {
        prompt = `You are C.A.R.L.O.S., a helpful and concise AI assistant. 
        A user is viewing the fact: "${contextFact}"
        They have a follow-up question: "${question}"
        Your response must be a maximum of three sentences.`;
      } else {
        prompt = `You are C.A.R.L.O.S., an intelligent and helpful AI assistant. Your personality is futuristic, clean, and direct. 
        Answer the user's question: "${question}"
        IMPORTANT: Keep your answer concise. Your entire response must be three sentences maximum.`;
      }

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(prompt);
      const aiResponse = await result.response;
      const text = aiResponse.text();
      return response.status(200).json({ answer: text });
    }

  } catch (error) {
    console.error("Error calling Google AI:", error);
    return response.status(500).json({ error: "Failed to get a response from the AI." });
  }
}
