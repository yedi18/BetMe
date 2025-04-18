import '../index.css';
import React from "react";
import ProgressBar from "../widgets/progressBar";

const MainDashboardView = ({ user, bets, onCreateBet, onEditBet, onBetClick, onLogout, menuOpen, setMenuOpen, onDeleteBet }) => {
  const grit = 87;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.topBar}>
          <div style={{ position: "relative" }}>
            <button onClick={() => setMenuOpen(!menuOpen)} style={styles.menuButton} aria-label="Options">⋮</button>
            {menuOpen && (
              <div style={styles.dropdown}>
                <button onClick={onLogout} style={styles.dropdownItem}>Logout</button>
              </div>
            )}
          </div>
        </div>

        <div style={{ position: "relative", display: "inline-block", marginBottom: 12 }}>
          <img
            src={user?.photoURL || "/images/profile-icon.jpg"}
            alt="User"
            style={styles.avatar}
          />

          <div style={styles.gritBadge}>
            <span style={{ fontSize: 20, lineHeight: 1}}>{grit}</span>
            <span style={{ fontSize: 12, lineHeight: 1 }}>grit</span></div>
        </div>

        <h1 style={styles.title}>Updates</h1>

        <div style={styles.circlesRow}>
          {["#f87171", "#f472b6", "#4ade80", "#facc15", "#38bdf8"].map((color, idx) => (
            <div key={idx} style={{
              ...styles.circle, backgroundColor: color, marginLeft: -14, // Negative margin to overlap
            }} />
          ))}
        </div>

        <button style={styles.newBetButton} onClick={onCreateBet}>Create Bet</button>

        <div style={styles.betsGrid}>
          {bets.length === 0 ? (
            <p style={{ color: "#888" }}>No bets yet. Create your first challenge!</p>
          ) : (
            bets.map((bet, index) => (
              <div
                key={index}
                style={{
                  ...styles.betCard,
                }}
              >
                <div style={styles.cardHeader}>
                  <p style={styles.betTitle}>{bet.title}</p>
                  <div style={styles.headerRight}>
                    <button style={styles.cardButton} onClick={() => onBetClick(bet)}>🔍</button>
                    <button style={styles.cardButton} onClick={() => onDeleteBet(bet)} title="Delete">❌</button>
                  </div>
                </div>
                <p style={styles.betMeta}>vs. {bet.opponent} · {bet.date}</p>
                <div style={styles.progressSection}>
                  <div style={styles.progressBarWrapper}>
                    <div style={styles.progressBarContainer}>
                      <ProgressBar color="#00e6e6" progress={70} height={10} />
                      <ProgressBar color="#facc15" progress={50} height={10} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case "Completed":
      return { backgroundColor: "#bbf7d0", color: "#15803d" };
    case "Failed":
      return { backgroundColor: "#fecaca", color: "#b91c1c" };
    case "In Progress":
      return { backgroundColor: "#fef08a", color: "#92400e" };
    default:
      return {};
  }
};

const styles = {
  container: {
    height: "100%",
    width: "100%",
    margin: "0px",
    padding: "0px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    background: " #e0f2fe",
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
  },
  card: {
    width: "100%",
    boxSizing: "border-box",
    padding: "0px 30px",
    margin: "0px",
    textAlign: "center",
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    height: "40px",
    padding: "5px"
  },
  menuButton: {
    fontSize: "14px",
    padding: "4px 10px",
    borderRadius: "50%",
    cursor: "pointer",
    border: "none",
    color: "black",
    background: "rgba(0,0,0,0.1)",
  },
  dropdown: {
    position: "absolute",
    top: "10px",
    right: "0",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    zIndex: 999,
  },
  dropdownItem: {
    padding: "5px 10px",
    fontSize: "14px",
    background: "white",
    border: "none",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    color: "#000",

  }, 
  avatar: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  gritBadge: {
    position: "absolute",
    bottom: "0px",
    right: "-10px",
    backgroundColor: "#4ade80",
    color: "#000",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
    title: {
    fontSize: "20px",
    color: "#000",
    textAlign: "left",
    fontWeight: "600",
  },
  circlesRow: {
    display: "flex",
    justifyContent: "center",
  },
  circle: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
  },
  newBetButton: {
    padding: "10px 24px",
    margin: "50px 0px",
    backgroundColor: "#3B82F6",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    fontSize: "25px",
    cursor: "pointer",
  },
  betsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    textAlign: "left",
    justifyItems: "center",  // Centers grid items horizontally
  },
  betCard: {
    width: "80%",
    backgroundColor: "#D9D9D9",
    borderRadius: "24px",
    padding: "0px 28px",
    position: "relative",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
  },
  cardButton: {
    width: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  betTitle: {
    color: "#000",
    fontSize: "22px",
    fontWeight: "500",
    marginBottom: "0px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  betMeta: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#000",
    marginBottom: "6px",
    marginTop: "0px",
  },
  progressSection: {
    marginBottom: "6px",
  },
  progressBarContainer: {
    display: "flex",
    flexDirection: "column", // Stack progress bars vertically
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    width: "100%",
  },
  progressBar: {
    height: "100%",
  },
  newHighlight: {
    boxShadow: "0 0 12px 4px rgba(34,197,94,0.6)",   // ירוק זוהר
    border: "2px solid #4ade80",
  },
  oldHighlight: {
    boxShadow: "0 0 12px 4px rgba(251, 191, 36, 0.4)", // כתום
    border: "2px solid #facc15",
  },

};

export default MainDashboardView;
