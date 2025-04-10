import React from "react";

import ProgressBar  from "../widgets/progressBar";
import UpdateCardf  from "../widgets/UpdateCard";

function BetDetails({ bet, onBack, onEdit }) {
  if (!bet) return null;

  return (
    <div style={detailStyles.container}>

      <h2 style={detailStyles.title}>{bet.title}</h2>
      

      <div style={detailStyles.progressBarContainer}>
        <ProgressBar color="#00e6e6" progress={70} />

        <ProgressBar color="#facc15" progress={50} />
      </div>

      <button style={detailStyles.title}>
      New Update
      </button>

      <UpdateCardf username="Yedidya" points={4} rank={14} description="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s..." />
      <UpdateCardf username="Ori" points={2.5} rank={9} description="Great progress on your challenge!" />

      <button style={detailStyles.editButton} onClick={() => onEdit(bet)}>
        ✏️ Edit
      </button>
    </div>
  );
}

const detailStyles = {
  container: {
    color: "#000", // Default text color (black)
    padding: "30px",
    backgroundColor: "#DCF5FF",
    borderRadius: "20px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "5",
    textAlign: "center",
  },
  title: {
    backgroundColor: "#3575f6",
    color: "white",
    fontSize: "22px",
    textAlign: "center",
    padding: "15px",
    borderRadius: "15px",
    width: "80%",
    maxWidth: "250px",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    margin: "20px auto",
  },
  progressBarContainer : {
    display: "flex",
    flexDirection: "column", // Stack progress bars vertically
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    gap: "0px", // Adds space between progress bars
    width: "100%",
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
