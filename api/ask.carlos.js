// TEMPORARY DIAGNOSTIC SCRIPT

export default async function handler(request, response) {
  // We are not calling the AI in this test.
  // We are only checking if this new code is running on the server.

  if (request.method === 'POST') {
    const { question } = request.body;

    // If this code is live, it will send back a success message.
    response.status(200).json({
      answer: `Backend confirmation: V2 received your question: '${question}'`
    });

  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}
