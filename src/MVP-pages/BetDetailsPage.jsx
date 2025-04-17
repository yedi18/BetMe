import React from "react";
import ProgressBar from "../widgets/progressBar";
import UpdateCardf from "../widgets/UpdateCard";

function BetDetails({ bet, onBack, onEdit, setPage }) {
  if (!bet) return null;

  const goToUpdatePage = () => {
    setPage("stats");
  };

  return (
    <div style={detailStyles.container}>
      <h2 style={detailStyles.title}>{bet.title}</h2>

      <div style={{ display: "flex", alignItems: "centerז", width: "100%", gap: "10px" }}>
        <div style={{
          width: "50px",
          height: "50px",
          background: "#00e6e6",
          borderRadius: "50%",
          flexShrink: 0,
          display: "inline-block",
          boxSizing: "border-box"
        }}></div>
        <ProgressBar color="#00e6e6" progress={70} height={20} />
      </div>

      <div style={{ height: "5px" }}></div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", gap: "10px" }}>
        <div style={{
          width: "50px",
          height: "50px",
          background: "#facc15",
          borderRadius: "50%",
          flexShrink: 0,
          display: "inline-block",
          boxSizing: "border-box"
        }}></div>
        <ProgressBar color="#facc15" progress={50} height={20} />
      </div>

      <button style={detailStyles.title} onClick={goToUpdatePage}>
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
    color: "#000",
    padding: "30px",
    backgroundColor: "#DCF5FF",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
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
  progressBarContainer: {
    boxSizing: "border-box",
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
