// This is the Vercel Serverless Function handler.
// Vercel automatically knows that any file inside the /api folder
// can be run as a backend endpoint.
export default function handler(request, response) {

  // For now, we'll just send back a success message.
  // This is to test that our backend is set up correctly before we add the AI logic.
  response.status(200).json({
    message: "Hello from the C.A.R.L.O.S. backend!"
  });
}

