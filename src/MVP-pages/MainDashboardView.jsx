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
            src={user?.photoURL || "/default-avatar.png"}
            alt="User"
            style={styles.avatar}
          />

          <div style={styles.gritBadge}><span style={{ fontSize: 32 }}>{grit}</span><span style={{ fontSize: 15 }}>grit</span></div>
        </div>

        <h1 style={styles.title}>Updates</h1>

        <div style={styles.circlesRow}>
          {["#f87171", "#f472b6", "#4ade80", "#facc15", "#38bdf8"].map((color, idx) => (
            <div key={idx} style={{ ...styles.circle, backgroundColor: color, marginLeft: -20, // Negative margin to overlap
            }} />
          ))}
        </div>

        <button style={styles.newBetButton} onClick={onCreateBet}>➕ Create New Bet</button>

        <div style={styles.betsGrid}>
          {bets.length === 0 ? (
            <p style={{ color: "#888" }}>No bets yet. Create your first challenge!</p>
          ) : (
            bets.map((bet, index) => (
              <div
                key={index}
                style={{
                  ...styles.betCard,
                  ...(bet.isNew ? styles.newHighlight : styles.oldHighlight),
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
                      <ProgressBar color="#00e6e6" progress={70} />
                      <ProgressBar color="#facc15" progress={50} />
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
    minHeight: "100vh",
    background: " #e0f2fe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    padding: "30px",
    borderRadius: "20px",
    textAlign: "center",
    width: "70%",
    maxWidth: "500px",
    position: "relative",
    gap: "20px",
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "8px",
  },
  menuButton: {
    background: "rgba(0,0,0,0.1)",
    border: "none",
    borderRadius: "100px",
    fontSize: "24px",
    cursor: "pointer",
    color: "black",
  },
  dropdown: {
    position: "absolute",
    top: "30px",
    right: "0",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    zIndex: 999,
  },
  dropdownItem: {
    padding: "10px 20px",
    fontSize: "14px",
    background: "white",
    border: "none",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
  },
  circlesRow: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
  },
  circle: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
  },
  title: {
    fontSize: "22px",
    color: "#1e3a8a",
    marginBottom: "4px",
    textAlign: "left",
  },
  avatar: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  gritBadge: {
    position: "absolute",
    bottom: "-30px",
    right: "-30px",
    backgroundColor: "#4ade80",
    color: "#000",
    borderRadius: "50%",
    padding: "6px",
    fontWeight: "bold",
    width: "70px",
    height: "70px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  newBetButton: {
    padding: "12px 24px",
    backgroundColor: "#2563eb",
    color: "#000",
    border: "none",
    borderRadius: "12px",
    fontSize: "30px",
    marginBottom: "20px",
    cursor: "pointer",
  },
  sectionTitle: {
    fontSize: "18px",
    color: "#111",
    fontWeight: "bold",
    marginBottom: "12px",
    textAlign: "left",
  },
  betsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "12px",
    textAlign: "left",
  },
  betCard: {
    width: "100%",
    backgroundColor: "#B0B0B0",
    borderRadius: "24px",
    padding: "16px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    position: "relative",
    transition: "box-shadow 0.3s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "6px", // ריווח בין סטטוס לאייקונים
  },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    backgroundColor: "#fef08a",
    color: "#92400e",
  },
  cardButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "6px",  // ✅ ריווח בין כפתורים
    zIndex: 2,          // ✅ יוודא שהם מעל התגית
  },
  betTitle: {
    color: "#000",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "4px",
  },
  betMeta: {
    fontSize: "14px",
    color: "#000",
    marginBottom: "6px",
  },
  progressSection: {
    marginBottom: "6px",
  },
  progressLabel: {
    fontSize: "12px",
    marginTop: "4px",
    color: "#475569",
  },
  progressBarContainer : {
    display: "flex",
    flexDirection: "column", // Stack progress bars vertically
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    gap: "0px", // Adds space between progress bars
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
