const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

// Load the environment variables
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Function to generate text
async function generateText() {
    const model =  genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = "Once upon a time, in a land far, far away, there was a";
    // Generate the content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
}

generateText();