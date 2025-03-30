// NewBet.jsx
import React, { useState } from "react";

function NewBet({ onNext }) {
  const [betName, setBetName] = useState("");
  const [goal, setGoal] = useState("");

  const handleNext = () => {
    if (betName && goal) {
      onNext({ betName, goal });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>type name...</h2>
      <p style={styles.step}>#1 Define the competition end goal</p>

      <input
        style={styles.input}
        placeholder="type here..."
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <button style={styles.nextButton} onClick={handleNext}>next</button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#e0f2fe",
    minHeight: "100vh",
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "22px",
    color: "#2563eb",
    marginBottom: "10px",
  },
  step: {
    fontSize: "16px",
    marginBottom: "20px",
  },
  input: {
    padding: "12px",
    width: "80%",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    fontSize: "16px",
  },
  nextButton: {
    padding: "12px 24px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default NewBet;
