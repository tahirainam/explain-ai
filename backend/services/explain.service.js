const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getExplanation = async (code, mode) => {
  let instruction = "";

  if (mode === "simple") {
    instruction = "Explain this code in very simple terms for a beginner.";
  } else if (mode === "detailed") {
    instruction = "Give a detailed technical explanation of this code.";
  } else if (mode === "bug") {
    instruction = "Find any bugs or issues in this code and explain how to fix them.";
  }

  const prompt = instruction + "\n\nCode:\n" + code;

  console.log("Sending request to Groq...");

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1024,
  });

  console.log("Response received!");

  return response.choices[0].message.content.trim();
};

module.exports = { getExplanation };