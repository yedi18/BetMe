import React from "react";

const MainDashboardView = ({ user, bets, onCreateBet, onEditBet, onBetClick, onLogout, menuOpen, setMenuOpen }) => {
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

        <div style={styles.circlesRow}>
          {["#f87171", "#f472b6", "#4ade80", "#facc15", "#38bdf8"].map((color, idx) => (
            <div key={idx} style={{ ...styles.circle, backgroundColor: color }} />
          ))}
        </div>

        <h1 style={styles.title}>Welcome to <span style={styles.brand}>BetMe 🎉</span></h1>
        <p style={styles.motivation}>Your goal is in your hands 💪</p>
        <p style={styles.dailyTip}>💡 Tip of the day: Invite a friend and make a fun bet!</p>

        <div style={{ position: "relative", display: "inline-block", marginBottom: 12 }}>
        <img
            src={user?.photoURL || "/default-avatar.png"} 
            alt="User"
            style={styles.avatar}
        />

          <div style={styles.gritBadge}>{grit}<br /><span style={{ fontSize: 10 }}>grit</span></div>
        </div>

        <h2 style={styles.name}>Hello, {user?.displayName || "Guest"} 👋</h2>

        <button style={styles.newBetButton} onClick={onCreateBet}>➕ Create New Bet</button>

        <h3 style={styles.sectionTitle}>🎯 Your Bets</h3>
        <div style={styles.betsGrid}>
          {bets.length === 0 ? (
            <p style={{ color: "#888" }}>No bets yet. Create your first challenge!</p>
          ) : (
            bets.map((bet, index) => (
              <div
                key={index}
                style={{
                  ...styles.betCard,
                  ...(bet.isNew ? styles.newHighlight : {}),
                }}
              >
                <div style={styles.cardHeader}>
                  <p style={styles.betTitle}>{bet.title}</p>
                  <div>
                    <button style={styles.cardButton} onClick={() => onEditBet(bet)}>✏️</button>
                    <button style={styles.cardButton} onClick={() => onBetClick(bet)}>🔍</button>
                  </div>
                </div>
                <p style={styles.betMeta}>vs. {bet.opponent} · {bet.date}</p>
                <div style={styles.progressSection}>
                  <p style={styles.progressLabel}>Your Progress</p>
                  <div style={styles.progressBarWrapper}>
                    <div style={{ ...styles.progressBar, width: `${bet.yourProgress}%`, backgroundColor: "#3b82f6" }} />
                  </div>
                  <p style={styles.progressLabel}>Opponent</p>
                  <div style={styles.progressBarWrapper}>
                    <div style={{ ...styles.progressBar, width: `${bet.opponentProgress}%`, backgroundColor: "#facc15" }} />
                  </div>
                </div>
                <span style={{ ...styles.statusBadge, ...getStatusStyle(bet.status) }}>{bet.status}</span>
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
    background: "linear-gradient(to bottom right, #e0f2fe, #ffffff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "100%",
    maxWidth: "600px",
    position: "relative",
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "8px",
  },
  menuButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
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
    gap: "10px",
    marginBottom: "16px",
  },
  circle: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
  },
  title: {
    fontSize: "22px",
    color: "#1e3a8a",
    marginBottom: "4px",
  },
  brand: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  motivation: {
    fontSize: "16px",
    color: "#1e40af",
    marginBottom: "6px",
  },
  dailyTip: {
    fontSize: "14px",
    color: "#0f172a",
    fontStyle: "italic",
    marginBottom: "16px",
  },
  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  gritBadge: {
    position: "absolute",
    top: "0",
    right: "-10px",
    backgroundColor: "#4ade80",
    color: "#065f46",
    borderRadius: "50%",
    padding: "6px",
    fontSize: "14px",
    fontWeight: "bold",
    width: "40px",
    height: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    margin: "10px 0",
    fontSize: "20px",
    color: "#1e40af",
  },
  newBetButton: {
    padding: "12px 24px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
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
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    position: "relative",
    transition: "box-shadow 0.3s ease",
  },
  newHighlight: {
    boxShadow: "0 0 12px 4px rgba(34,197,94,0.6)",
    border: "2px solid #4ade80",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  cardButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "6px",
  },
  betTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "4px",
  },
  betMeta: {
    fontSize: "14px",
    color: "#64748b",
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
  progressBarWrapper: {
    height: "6px",
    backgroundColor: "#e2e8f0",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "6px",
  },
  progressBar: {
    height: "100%",
  },
  statusBadge: {
    position: "absolute",
    top: "16px",
    right: "16px",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
};

export default MainDashboardView;
