import React from "react";

function CodeInput({ code, setCode, mode, setMode, onSubmit, loading }) {
  return (
    <div>
      <p style={{
        color: "#888888",
        fontSize: "0.78rem",
        marginBottom: "8px",
        textTransform: "uppercase",
        letterSpacing: "1px",
      }}>
        Your Code
      </p>
      <textarea
        rows={10}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        style={{
          width: "100%",
          padding: "14px",
          fontSize: "14px",
          fontFamily: "JetBrains Mono, monospace",
          background: "#0f0f0f",
          color: "#ececec",
          border: "1px solid #2a2a2a",
          borderRadius: "8px",
          resize: "vertical",
          outline: "none",
          lineHeight: "1.7",
        }}
      />

      <p style={{
        color: "#888888",
        fontSize: "0.78rem",
        margin: "20px 0 8px",
        textTransform: "uppercase",
        letterSpacing: "1px",
      }}>
        Mode
      </p>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 14px",
          fontSize: "14px",
          fontFamily: "Syne, Arial, sans-serif",
          background: "#0f0f0f",
          color: "#ececec",
          border: "1px solid #2a2a2a",
          borderRadius: "8px",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <option value="simple">Simple Explanation</option>
        <option value="detailed">Detailed Explanation</option>
        <option value="bug">Bug Detection</option>
      </select>

      <br /><br />

      <button
        onClick={onSubmit}
        disabled={loading}
        style={{ width: "100%", padding: "13px", fontSize: "15px" }}
      >
        {loading ? "Analyzing..." : "Explain Code"}
      </button>
    </div>
  );
}

export default CodeInput;