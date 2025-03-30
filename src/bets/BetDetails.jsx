import React from "react";

function BetDetails({ bet, onBack, onEdit }) {
  if (!bet) return null;

  return (
    <div style={detailStyles.container}>
      <button onClick={onBack} style={detailStyles.backButton}>⬅ Back</button>

      <h2 style={detailStyles.title}>{bet.title}</h2>
      <p>vs. {bet.opponent}</p>
      <p>Date: {bet.date}</p>

      <div style={detailStyles.section}>
        <p>Your Progress</p>
        <div style={detailStyles.progressWrapper}>
          <div style={{ ...detailStyles.progressBar, width: `${bet.yourProgress}%`, backgroundColor: "#3b82f6" }} />
        </div>
      </div>

      <div style={detailStyles.section}>
        <p>Opponent</p>
        <div style={detailStyles.progressWrapper}>
          <div style={{ ...detailStyles.progressBar, width: `${bet.opponentProgress}%`, backgroundColor: "#facc15" }} />
        </div>
      </div>

      <button style={detailStyles.editButton} onClick={() => onEdit(bet)}>
        ✏️ Edit
      </button>
    </div>
  );
}

const detailStyles = {
  container: {
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "auto",
    textAlign: "center",
  },
  backButton: {
    background: "none",
    border: "none",
    fontSize: "16px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  section: {
    margin: "20px 0",
  },
  progressWrapper: {
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
  editButton: {
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default BetDetails;
