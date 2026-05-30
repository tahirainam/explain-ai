import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
        <button onClick={handleCopy} style={{ padding: "6px 14px", fontSize: "12px" }}>
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>

      <div style={{
        background: "#0f0f0f",
        borderRadius: "8px",
        padding: "20px",
        border: "1px solid #2a2a2a",
        lineHeight: "1.8",
        fontSize: "15px",
        fontFamily: "Syne, Arial, sans-serif",
      }}>
        <ReactMarkdown
          components={{
            // Code blocks — syntax highlighted
            code({ inline, className, children }) {
              const language = className?.replace("language-", "") || "javascript";

              if (inline) {
                // Inline code like `variable`
                return (
                  <code style={{
                    background: "#2a2a2a",
                    color: "#e8e8e8",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "13px",
                  }}>
                    {children}
                  </code>
                );
              }

              // Full code blocks
              return (
                <SyntaxHighlighter
                  language={language}
                  style={oneDark}
                  customStyle={{
                    borderRadius: "8px",
                    fontSize: "13px",
                    margin: "12px 0",
                    border: "1px solid #2a2a2a",
                  }}
                >
                  {String(children).trim()}
                </SyntaxHighlighter>
              );
            },

            // Paragraphs
            p: ({ children }) => (
              <p style={{ color: "#cccccc", marginBottom: "12px" }}>{children}</p>
            ),

            // Headings
            h1: ({ children }) => (
              <h1 style={{ color: "#ffffff", fontFamily: "Syne, sans-serif", margin: "16px 0 8px" }}>{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 style={{ color: "#ffffff", fontFamily: "Syne, sans-serif", margin: "16px 0 8px" }}>{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ color: "#ffffff", fontFamily: "Syne, sans-serif", margin: "12px 0 6px" }}>{children}</h3>
            ),

            // Lists
            ul: ({ children }) => (
              <ul style={{ paddingLeft: "20px", marginBottom: "12px", color: "#cccccc" }}>{children}</ul>
            ),
            ol: ({ children }) => (
              <ol style={{ paddingLeft: "20px", marginBottom: "12px", color: "#cccccc" }}>{children}</ol>
            ),
            li: ({ children }) => (
              <li style={{ marginBottom: "6px" }}>{children}</li>
            ),

            // Bold
            strong: ({ children }) => (
              <strong style={{ color: "#ffffff" }}>{children}</strong>
            ),
          }}
        >
          {explanation}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default OutputBox;