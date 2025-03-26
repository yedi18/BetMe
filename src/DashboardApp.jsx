import React, { useState } from "react";
import Dashboard from "./Dashboard";

const PageTemplate = ({ title, icon }) => (
  <div style={styles.pageWrapper}>
    <h2 style={styles.pageTitle}>{icon} {title}</h2>
  </div>
);

export default function DashboardApp({ user, onLogout, onCreateBet }) {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Dashboard user={user} onLogout={onLogout} onCreateBet={onCreateBet} />;
      case "bets":
        return <PageTemplate title="My Bets" icon="📋" />;
      case "stats":
        return <PageTemplate title="Statistics" icon="📊" />;
      case "profile":
        return <PageTemplate title="Profile" icon="👤" />;
      case "settings":
        return <PageTemplate title="Settings" icon="⚙️" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.contentContainer}>{renderPage()}</div>

      <nav style={styles.toolbar}>
        {[
          { icon: "🏠", label: "home" },
          { icon: "📋", label: "bets" },
          { icon: "📊", label: "stats" },
          { icon: "👤", label: "profile" },
          { icon: "⚙️", label: "settings" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => setPage(item.label)}
            style={{
              ...styles.icon,
              ...(page === item.label ? styles.active : {}),
            }}
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    maxWidth: "480px",
    margin: "0 auto",
    backgroundColor: "#f9fafb",
    position: "relative",
    borderLeft: "1px solid #e5e7eb",
    borderRight: "1px solid #e5e7eb",
  },
  contentContainer: {
    paddingBottom: "70px", // Space for toolbar
    flex: 1,
  },
  toolbar: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "480px",
    backgroundColor: "#ffffff",
    borderTop: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 0",
    zIndex: 999,
  },
  icon: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    padding: "8px 14px",
    borderRadius: "10px",
    transition: "all 0.2s ease-in-out",
  },
  active: {
    border: "2px solid #000",
  },
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 80px)",
  },
  pageTitle: {
    fontSize: "28px",
    color: "#1e40af",
  },
};