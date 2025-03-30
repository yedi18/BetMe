import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function Dashboard({ user, onLogout, onCreateBet }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  const bets = [
    {
      title: "Workout Every Day",
      status: "Completed",
      opponent: "Lior",
      opponentPhoto: "/lior-avatar.png",
      yourProgress: 100,
      opponentProgress: 80,
      date: "Mar 20",
    },
    {
      title: "No Junk Food",
      status: "Failed",
      opponent: "Ben",
      opponentPhoto: "/ben-avatar.png",
      yourProgress: 30,
      opponentProgress: 100,
      date: "Mar 15",
    },
    {
      title: "Read After Lunch",
      status: "In Progress",
      opponent: "Dan",
      opponentPhoto: "/dan-avatar.png",
      yourProgress: 60,
      opponentProgress: 50,
      date: "Mar 26",
    },
  ];

  const grit = 87; // לדוגמה

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* תפריט עליון */}
        <div style={styles.topBar}>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={styles.menuButton}
              aria-label="Options"
            >
              ⋮
            </button>
            {menuOpen && (
              <div style={styles.dropdown}>
                <button onClick={handleLogout} style={styles.dropdownItem}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* עיגולים צבעוניים */}
        <div style={styles.circlesRow}>
          {["#f87171", "#f472b6", "#4ade80", "#facc15", "#38bdf8"].map((color, idx) => (
            <div key={idx} style={{ ...styles.circle, backgroundColor: color }} />
          ))}
        </div>

        {/* כותרת וברוכים הבאים */}
        <h1 style={styles.title}>
          Welcome to <span style={styles.brand}>BetMe 🎉</span>
        </h1>
        <p style={styles.motivation}>Your goal is in your hands 💪</p>
        <p style={styles.dailyTip}>💡 Tip of the day: Invite a friend and make a fun bet!</p>

        {/* תמונת משתמש + grit */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: 12 }}>
          <img
            src={user?.photoURL?.trim() !== "" ? user.photoURL : "/default-avatar.png"}
            alt="User"
            style={styles.avatar}
          />
          <div style={styles.gritBadge}>{grit}<br /><span style={{ fontSize: 10 }}>grit</span></div>
        </div>

        <h2 style={styles.name}>Hello, {user.displayName} 👋</h2>

        {/* כפתור יצירת התערבות */}
        <button style={styles.newBetButton} onClick={onCreateBet}>
          ➕ Create New Bet
        </button>

        {/* רשימת התערבויות */}
        <h3 style={styles.sectionTitle}>🎯 Your Bets</h3>
        {bets.map((bet, index) => (
          <div key={index} style={styles.betCard}>
            <div style={styles.betRow}>
              <img src={bet.opponentPhoto} alt={bet.opponent} style={styles.opponentAvatar} />
              <div style={{ flex: 1, marginLeft: "10px" }}>
                <p style={styles.betTitle}>{bet.title}</p>
                <p style={styles.betMeta}>vs. {bet.opponent} · {bet.date}</p>

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
          </div>
        ))}
      </div>
    </div>
  );
}

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
    maxWidth: "500px",
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
  },
  betCard: {
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    padding: "14px",
    marginBottom: "12px",
    textAlign: "left",
  },
  betRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  opponentAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
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
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    alignSelf: "flex-start",
  },
};

export default Dashboard;
