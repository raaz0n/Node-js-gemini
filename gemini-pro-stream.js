const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const fs = require("fs");


dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGeneratePath(path, mimeType) { 
   return {
    inlineData:{
        data:Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
    }
   }
}

async function generateText() {
    const model =  genAI.getGenerativeModel({ model: "gemini-pro-vision"});
    const prompt = "Describe the image below in a few sentences.";
    const imageParams = [fileToGeneratePath("cup.png", "image/png")];
    const result = await model.generateContentStream([prompt, ...imageParams]);
    let text = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      text += chunkText;
    }
    return text;
}

generateText();