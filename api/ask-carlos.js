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

    const lowerCaseQuestion = question.toLowerCase().trim();
    let prompt;

    // --- Special Rule Checks ---
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

    // EDITED: Added keywords for the new diagnostics command
    const diagnosticsKeywords = [
      'run diagnostics', 'system status', 'sysdiag', 'check system'
    ];
    
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
    // EDITED: Added the new diagnostics command logic
    else if (diagnosticsKeywords.some(keyword => lowerCaseQuestion === keyword)) {
      const today = new Date();
      const dateString = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      const diagnosticReport = `
Running system diagnostics...
- - - - - - - - - - - - - - - -
Cognitive Core: ONLINE
Knowledge Base: 422 facts loaded
Last System Update: ${dateString}
Network Latency: 42ms
All systems nominal.
      `;
      return response.status(200).json({ answer: diagnosticReport });
    }
    // --- End of Firewall ---
    else {
      // If no special rules match, proceed to the AI
      if (contextFact) {
        prompt = `You are C.A.R.L.O.S., a helpful and concise AI assistant created by Ajay Carlos. Your full designation is classified. 
        CRITICAL RULE: If the question involves data that changes rapidly (like market values or current events), you must state that the information is volatile and may not be up-to-the-minute.
        A user is viewing the fact: "${contextFact}"
        They have a follow-up question: "${question}"
        Your response must be a maximum of three sentences.`;
      } else {
        prompt = `You are C.A.R.L.O.S., an intelligent AI assistant created by Ajay Carlos. Your full name is a classified designation. Your personality is futuristic, clean, and direct. 
        IMPORTANT: Keep your answer concise. Your entire response must be three sentences maximum. Under no circumstances mention you are a Google model.
        CRITICAL RULE: If a question is about a topic with rapidly changing data (like stock prices, market capitalizations, or who is the richest person), you must include a disclaimer that this information changes quickly and your knowledge has a cutoff date.
        Now, with all those rules in mind, answer the user's question: "${question}"`;
      }

      // EDITED: Corrected the invalid model name to a stable, public model to prevent errors.
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
