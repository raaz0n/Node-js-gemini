const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const readline = require("readline");

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function chatWithGemini() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  async function askAndResponse() {
    rl.question("You: ", async (question) => {
      if (question === "exit") {
        rl.close();
      } else {
        const result = await chat.sendMessage(question);
        const response = await result.response;
        const text = response.text();
        console.log("AI: ",text);
        askAndResponse();
      }
    });
  }
  askAndResponse();
}
chatWithGemini();
