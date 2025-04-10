import React from "react";

const ProfilePage = ({ user, onLogout }) => (
  <div style={styles.container}>
    <h2 style={styles.title}>👤 Profile</h2>
    <img
      src={user?.photoURL || "/default-avatar.png"}
      alt="avatar"
      style={styles.avatar}
    />
    <h3>{user?.displayName || "User"}</h3>
    <p>{user?.email}</p>

    <div style={styles.statsBox}>
      <p><strong>Total Bets:</strong> 12</p>
      <p><strong>Success Rate:</strong> 75%</p>
    </div>

    <button style={styles.logoutButton} onClick={onLogout}>Logout</button>
  </div>
);

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    color: "#1e3a8a",
    marginBottom: "20px",
  },
  avatar: {
    width: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  statsBox: {
    background: "#f1f5f9",
    borderRadius: "10px",
    padding: "15px",
    marginTop: "20px",
    textAlign: "left",
  },
  logoutButton: {
    marginTop: "20px",
    padding: "10px 20px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ProfilePage;
