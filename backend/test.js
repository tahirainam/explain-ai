require("dotenv").config();
const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function test() {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: "Say hello in one sentence." }],
      max_tokens: 100,
    });
    console.log("SUCCESS:", response.choices[0].message.content);
  } catch (error) {
    console.log("ERROR:", error.message);
  }
}

test();