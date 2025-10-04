// TEMPORARY DIAGNOSTIC SCRIPT for /api/ask-carlos.js

export default async function handler(request, response) {
  if (request.method === 'POST') {
    const { question } = request.body;

    // If this code is live, it will send back this success message.
    response.status(200).json({
      answer: `Backend confirmation: V2 received your question: '${question}'`
    });

  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}
