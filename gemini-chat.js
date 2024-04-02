const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const readline = require("readline");

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Create an interface for communicating with the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


// Function to chat with the AI
async function chatWithGemini() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });
  
  // Function to ask and respond to the AI
  async function askAndResponse() {
    rl.question("You: ", async (question) => {
      if (question === "exit") {
        rl.close();
      } else {
        const result = await chat.sendMessage(question);
        const response = await result.response;
        const text = response.text();
        console.log("AI: ",text);
        // Ask the next question
        askAndResponse();
      }
    });
  }
  // Start the conversation
  askAndResponse();
}

// Start the chat
chatWithGemini();
