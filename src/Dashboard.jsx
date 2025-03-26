// Dashboard.jsx
/*
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";


function Dashboard({ user, onLogout,onCreateBet }) {
  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to <span style={styles.brand}>BetMe🎉</span></h1>
        <p style={styles.motivation}>המטרה שלך בידיים שלך 💪</p>
        <p style={styles.dailyTip}>💡 טיפ להיום: הזמן חבר והתערבו על משהו כיפי!</p>

        <img
          src={(user.photoURL && user.photoURL.trim() !== "") ? user.photoURL : "/default-avatar.png"}
          alt="User"
          style={styles.avatar}
        />
        <h2 style={styles.name}>שלום, {user.displayName} 👋</h2>

        <button
          style={{ ...styles.button, ...styles.logout }}
          onClick={handleLogout}
        >
          התנתק
        </button>

        <h3 style={styles.sectionTitle}>🎯 ההתערבויות שלך</h3>
        <p style={styles.emptyText}>אין עדיין התערבויות. הזמן חבר ליצור אחת!</p>

        <button
          style={{ ...styles.button, ...styles.newBet }}
          onClick={onCreateBet}
        >
          ➕ צור התערבות חדשה
        </button>

        <button
          style={{ ...styles.button, ...styles.newBet }}
          onClick={onCreateBet}
        >
          חזור
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #dbeafe, #ffffff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "450px",
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
    borderRadius: "50%",
    marginBottom: "10px",
  },
  name: {
    margin: "10px 0",
    fontSize: "24px",
    color: "#1e40af",
  },
  button: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
    marginTop: "10px",
  },
  logout: {
    background: "#ef4444",
    color: "#fff",
  },
  newBet: {
    background: "#1e40af",
    color: "#fff",
    marginTop: "20px",
  },
  sectionTitle: {
    marginTop: "30px",
    fontSize: "18px",
    color: "#111",
    fontWeight: "bold",
  },
  emptyText: {
    color: "#555",
    fontStyle: "italic",
  },
  statsBox: {
    backgroundColor: "#f1f5f9",
    borderRadius: "10px",
    padding: "12px",
    marginTop: "16px",
  },
  stat: {
    fontSize: "14px",
    color: "#1e293b",
    margin: "4px 0",
  },
};

export default Dashboard;
*/
// Dashboard.jsx
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Top bar with menu */}
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
                <button onClick={handleLogout} style={styles.dropdownItem}>Logout</button>
              </div>
            )}
          </div>
        </div>

        <h1 style={styles.title}>
          Welcome to <span style={styles.brand}>BetMe 🎉</span>
        </h1>
        <p style={styles.motivation}>Your goal is in your hands 💪</p>
        <p style={styles.dailyTip}>💡 Tip of the day: Invite a friend and make a fun bet!</p>

        <button style={{ ...styles.button, ...styles.newBet }} onClick={onCreateBet}>
          ➕ Create New Bet
        </button>

        <img
          src={user?.photoURL?.trim() !== "" ? user.photoURL : "/default-avatar.png"}
          alt="User"
          style={styles.avatar}
        />
        <h2 style={styles.name}>Hello, {user.displayName} 👋</h2>

        <h3 style={styles.sectionTitle}>🎯 Your Bets</h3>

        <div>
          {bets.map((bet, index) => (
            <div key={index} style={styles.betCard}>
              <div style={styles.betRow}>
                <img src={bet.opponentPhoto} alt={bet.opponent} style={styles.opponentAvatar} />
                <div style={{ flex: 1, marginLeft: "10px" }}>
                  <p style={styles.betTitle}>{bet.title}</p>
                  <p style={styles.betMeta}>vs. {bet.opponent} · {bet.date}</p>

                  <div style={styles.progressLabel}>Your Progress</div>
                  <div style={styles.progressBarWrapper}>
                    <div style={{ ...styles.progressBar, width: `${bet.yourProgress}%`, backgroundColor: "#3b82f6" }} />
                  </div>

                  <div style={styles.progressLabel}>Opponent</div>
                  <div style={styles.progressBarWrapper}>
                    <div style={{ ...styles.progressBar, width: `${bet.opponentProgress}%`, backgroundColor: "#facc15" }} />
                  </div>
                </div>
                <span style={{ ...styles.statusBadge, ...getStatusStyle(bet.status) }}>
                  {bet.status}
                </span>
              </div>
            </div>
          ))}
        </div>
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
    background: "linear-gradient(to bottom right, #dbeafe, #ffffff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
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
    marginBottom: "10px",
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
    borderRadius: "50%",
    marginBottom: "10px",
  },
  name: {
    margin: "10px 0",
    fontSize: "24px",
    color: "#1e40af",
  },
  button: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
    marginTop: "10px",
  },
  newBet: {
    background: "#1e40af",
    color: "#fff",
    marginBottom: "16px",
  },
  sectionTitle: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#111",
    fontWeight: "bold",
    marginBottom: "12px",
  },
  betCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: "12px",
    padding: "14px",
    marginTop: "12px",
    textAlign: "left",
  },
  betRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
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
  opponentAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
};

export default Dashboard;
