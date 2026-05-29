import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

function OutputBox({ explanation, loading, error }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(explanation).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <p style={{ color: "#666666", textAlign: "center", padding: "20px" }}>
        Analyzing your code...
      </p>
    );
  }

  if (error) {
    return <p style={{ color: "#ff4444" }}>⚠️ {error}</p>;
  }

  if (!explanation) {
    return (
      <p style={{ color: "#666666", textAlign: "center", padding: "20px" }}>
        Your explanation will appear here.
      </p>
    );
  }

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
      }}>
        <p style={{ color: "#888888", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px" }}>
          Explanation
        </p>
        <button
          onClick={handleCopy}
          style={{ padding: "6px 14px", fontSize: "12px" }}
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>

      <div style={{
        background: "#0f0f0f",
        borderRadius: "8px",
        padding: "20px",
        lineHeight: "1.8",
        fontSize: "15px",
        fontFamily: "JetBrains Mono, monospace",
        border: "1px solid #2a2a2a",
      }}>
        <ReactMarkdown>{explanation}</ReactMarkdown>
      </div>
    </div>
  );
}

export default OutputBox;