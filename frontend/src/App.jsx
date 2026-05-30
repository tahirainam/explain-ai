import React, { useState } from "react";
import CodeInput from "./components/CodeInput";
import OutputBox from "./components/OutputBox";

function App() {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("simple");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert("Please paste some code first!");
      return;
    }

    setLoading(true);
    setError("");
    setExplanation("");

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, mode }),
      });

      const data = await response.json();
      const fullText = data.explanation;

      setLoading(false);

      // Typing effect — reveal one character at a time
      let index = 0;
      const interval = setInterval(() => {
        index++;
        setExplanation(fullText.slice(0, index));
        if (index >= fullText.length) {
          clearInterval(interval);
        }
      }, 8);

    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", padding: "50px 0 40px" }}>
        <h1 style={{
          fontFamily: "Syne, Arial, sans-serif",
          fontSize: "2.4rem",
          fontWeight: 800,
          letterSpacing: "-1px",
          color: "#ffffff",
        }}>
          ⟨/⟩ ExplainAI
        </h1>
        <p style={{
          color: "#555555",
          marginTop: "10px",
          fontSize: "0.95rem",
          letterSpacing: "0.3px",
        }}>
          Paste code, pick a mode, get a clear explanation.
        </p>
      </div>

      {/* Input Panel */}
      <div style={{
        background: "#1a1a1a",
        borderRadius: "12px",
        padding: "28px",
        marginBottom: "16px",
        border: "1px solid #2a2a2a",
        transition: "border-color 0.2s ease",
      }}>
        <CodeInput
          code={code}
          setCode={setCode}
          mode={mode}
          setMode={setMode}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      {/* Output Panel */}
      <div style={{
        background: "#1a1a1a",
        borderRadius: "12px",
        padding: "28px",
        border: "1px solid #2a2a2a",
        marginBottom: "40px",
        transition: "border-color 0.2s ease",
      }}>
        <OutputBox
          explanation={explanation}
          loading={loading}
          error={error}
        />
      </div>

    </div>
  );
}

export default App;