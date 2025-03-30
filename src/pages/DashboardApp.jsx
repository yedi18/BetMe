import React, { useState } from "react";
import Dashboard from "../mainPart/Dashboard";
import BetDetails from "./BetDetails";
import UpdateBet from "./UpdateBet";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";
import NewBet from "./NewBet";

const PageTemplate = ({ title, icon }) => (
  <div style={styles.pageWrapper}>
    <h2 style={styles.pageTitle}>{icon} {title}</h2>
  </div>
);


export default function DashboardApp({ user, onLogout }) {
  const [page, setPage] = useState("home");
  const [bets, setBets] = useState([]);
  const [selectedBet, setSelectedBet] = useState(null);


  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <Dashboard
            user={user}
            onLogout={onLogout}
            onCreateBet={() => setPage("newbet")}
            bets={bets}
          />
        );
      case "bets":
        return <BetDetails bet={bets[0] || {}} />;
      case "stats":
        return <UpdateBet bet={bets[0] || {}} />;
      case "profile":
        return <ProfilePage user={user} onLogout={onLogout} />;
      case "settings":
        return <SettingsPage />;
      case "newbet":
        return (
          <NewBet
            onBack={() => setPage("home")}
            onFinish={(data) => {
              const newBet = {
                title: data.title,
                status: "In Progress",
                opponent: data.participants || "Unknown",
                opponentPhoto: "/default-avatar.png",
                yourProgress: 0,
                opponentProgress: 0,
                date: data.t_date || "TBD"
              };
              setBets((prev) => [...prev, newBet]);
              setPage("home");
            }}
          />
        );
      case "bets":
        return <BetDetails bet={selectedBet} />;

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
    paddingBottom: "70px",
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
