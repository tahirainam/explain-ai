const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getExplanation = async (code, mode) => {

  // Each mode has a system role and a clear instruction
  const prompts = {
    simple: {
      system: "You are a friendly programming tutor explaining code to a complete beginner. Use simple words, avoid technical jargon, and use short sentences. If helpful, use analogies from real life.",
      user: `Explain what this code does in simple terms a beginner can understand. Break it down step by step.\n\nCode:\n${code}`,
    },
    detailed: {
      system: "You are a senior software engineer doing a thorough code review. You explain code in a structured and technical way. Use headings, bullet points, and cover what the code does, how it works, and why it is written that way.",
      user: `Give a detailed technical explanation of this code. Cover: what it does, how each part works, any patterns or concepts used, and anything a developer should know.\n\nCode:\n${code}`,
    },
    bug: {
      system: "You are an expert debugger and code reviewer. Your job is to find bugs, errors, bad practices, and edge cases in code. For each issue you find, explain what it is, why it is a problem, and provide a fix.",
      user: `Review this code carefully. List any bugs, errors, or bad practices you find. For each issue explain the problem and show the corrected code.\n\nCode:\n${code}`,
    },
  };

  const selected = prompts[mode];

  console.log("Sending request to Groq...");

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: selected.system },
      { role: "user", content: selected.user },
    ],
    max_tokens: 1024,
    temperature: 0.5,
  });

  console.log("Response received!");

  return response.choices[0].message.content.trim();
};

module.exports = { getExplanation };