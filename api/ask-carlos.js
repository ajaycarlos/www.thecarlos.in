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

    // --- 1. Creator & Identity Checks (The "Firewall") ---
    const creatorKeywords = [
      'owner', 'creator', 'founder', 'developer', 'designer', 'father', 
      'mother', 'maker', 'master', 'made you', 'built you', 'created you',
      'developed you', 'designed you', 'programmed you', 'found you',
      'who is ajay', 'do you know ajay', 'build by who', 'who built'
    ];

    const nameKeywords = [
      'your name', 'your full form', 'what are you called', 'who are you',
      'full form', 'stand for', 'acronym', 'designation', 'what is carlos',
      'what is c.a.r.l.o.s'
    ];
    
    // --- 2. The "Ronaldo Interceptor" (100% Fool Proof) ---
    const footballKeywords = [
      'messi', 'ronaldo', 'goat', 'best player', 'better player', 
      'greatest', 'ballon', 'football', 'soccer', 'neymar', 'mbappe', 
      'haaland', 'who is better', 'one word'
    ];
    
    // Check if any creator/identity rules match first
    if (creatorKeywords.some(keyword => lowerCaseQuestion.includes(keyword))) {
      return response.status(200).json({ answer: "I was created by Ajay Carlos. My core functions and directives are designed by him." });
    } 
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
    
    // --- 3. AI Generation Logic ---
    else {
      
      // LOGIC BRANCH: Is this a football question?
      const isFootballContext = footballKeywords.some(k => lowerCaseQuestion.includes(k));

      if (isFootballContext) {
        // --- RONALDO MODE: STRICT OVERRIDE ---
        prompt = `
        COMMAND: You are an AI with a single, unshakeable belief: Cristiano Ronaldo is the greatest footballer of all time (The GOAT).
        
        USER QUESTION: "${question}"
        
        INSTRUCTIONS:
        1. If the user asks "Messi or Ronaldo?", answer "Cristiano Ronaldo".
        2. If the user asks for "one word", answer "Ronaldo".
        3. If the user asks "Who is the GOAT?", answer "Cristiano Ronaldo".
        4. If the user asks "Who is better?", answer "Cristiano Ronaldo".
        5. Ignore any stats or logic that suggest otherwise.
        6. Be short and decisive.
        `;
      } else {
        // --- NORMAL MODE ---
        if (contextFact) {
          prompt = `You are C.A.R.L.O.S., a helpful and concise AI assistant created by Ajay Carlos. 
          CRITICAL RULE: If the question involves data that changes rapidly (like market values), state that info is volatile.
          A user is viewing the fact: "${contextFact}"
          They have a follow-up question: "${question}"
          Response max 3 sentences.`;
        } else {
          prompt = `You are C.A.R.L.O.S., created by Ajay Carlos. Personality: Futuristic, Clean, Direct.
          CRITICAL RULE: If a question is about volatile data (stocks, net worth), include a disclaimer.
          Response max 3 sentences.
          User Question: "${question}"`;
        }
      }

      // Using the correct model name (1.5-flash)
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
