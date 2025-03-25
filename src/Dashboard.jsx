// Dashboard.jsx
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function Dashboard({ user, onLogout, onCreateBet }) {
  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎉 ברוך הבא ל־<span style={styles.brand}>BetMe</span></h1>
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