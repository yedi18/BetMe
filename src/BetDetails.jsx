// BetDetails.jsx
import React from "react";

function BetDetails({ bet }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{bet.title}</h2>

      <div style={styles.progressSection}>
        <div style={styles.progressBarWrapper}>
          <div style={{ ...styles.progress, width: `${bet.yourProgress}%`, backgroundColor: "#06b6d4" }} />
        </div>
        <div style={styles.progressBarWrapper}>
          <div style={{ ...styles.progress, width: `${bet.opponentProgress}%`, backgroundColor: "#facc15" }} />
        </div>
      </div>

      <button style={styles.updateButton}>New Update</button>

      <div style={styles.updatesList}>
        {bet.updates?.map((u, idx) => (
          <div key={idx} style={styles.updateItem}>
            <p><strong>{u.name}</strong> +{u.points} points</p>
            <p style={{ fontSize: "13px", color: "#64748b" }}>{u.text}</p>
          </div>
        ))}
      </div>
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
  updateButton: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  updatesList: {
    marginTop: "10px",
  },
  updateItem: {
    padding: "10px",
    background: "#fff",
    borderRadius: "10px",
    marginBottom: "10px",
  },
};

export default BetDetails;
