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
      setExplanation(data.explanation);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
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
          color: "#666666",
          marginTop: "10px",
          fontSize: "0.95rem",
        }}>
          Paste code, pick a mode, get a clear explanation.
        </p>
      </div>

      {/* Input Panel */}
      <div style={{
        background: "#1a1a1a",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "16px",
        border: "1px solid #2a2a2a",
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
        padding: "24px",
        border: "1px solid #2a2a2a",
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