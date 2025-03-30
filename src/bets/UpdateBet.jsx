// UpdateBet.jsx
import React, { useState } from "react";

function UpdateBet({ bet }) {
  const [text, setText] = useState("");
  const handleUpload = () => {
    console.log("Uploading update:", text);
    setText("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{bet.title}</h2>
      <p style={styles.subtitle}>update #{bet.updateNumber}</p>

      <div style={styles.progressSection}>
        <div style={styles.progressBarWrapper}>
          <div style={{ ...styles.progress, width: `${bet.yourProgress}%`, backgroundColor: "#06b6d4" }} />
        </div>
        <div style={styles.progressBarWrapper}>
          <div style={{ ...styles.progress, width: `${bet.opponentProgress}%`, backgroundColor: "#facc15" }} />
        </div>
      </div>

      <button style={styles.uploadButton} onClick={handleUpload}>Upload</button>

      <textarea
        placeholder="type here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.textArea}
      />

      <button style={styles.addFile}>Add File</button>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#ecfeff",
    minHeight: "100vh",
  },
  title: {
    fontSize: "22px",
    color: "#2563eb",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  progressSection: {
    marginBottom: "20px",
  },
  progressBarWrapper: {
    height: "10px",
    backgroundColor: "#e2e8f0",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  progress: {
    height: "100%",
  },
  uploadButton: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  textArea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  addFile: {
    backgroundColor: "#0ea5e9",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
  },
};

export default UpdateBet;
