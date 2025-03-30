import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import NewBet from "../bets/NewBet";
import BetDetails from "../bets/BetDetails";
import UpdateBet from "../bets/UpdateBet";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import MainDashboardView from "./MainDashboardView";

export default function Dashboard({ user, onLogout }) {
  const [page, setPage] = useState("home");
  const [bets, setBets] = useState([]);
  const [selectedBet, setSelectedBet] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  const handleNewBetFinish = (data) => {
    const newBet = {
      title: data.title,
      status: "In Progress",
      opponent: data.participants?.[0] || "Unknown",
      opponentPhoto: "/default-avatar.png",
      yourProgress: 0,
      opponentProgress: 0,
      date: data.deadline || "TBD",
      isNew: true,
    };
    setBets((prev) => [...prev, newBet]);
    setPage("home");
    setShowSuccess(true);
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <MainDashboardView
            user={user}
            bets={bets}
            onCreateBet={() => setPage("newbet")}
            onEditBet={(bet) => {
              setSelectedBet(bet);
              setPage("stats");
            }}
            onBetClick={(bet) => {
              setSelectedBet(bet);
              setPage("bets");
            }}
            onLogout={handleLogout}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        );
      case "newbet":
        return <NewBet onBack={() => setPage("home")} onFinish={handleNewBetFinish} />;
      case "bets":
        return (
          <>
            <button onClick={() => setPage("home")} style={styles.backButton}>⬅ Back</button>
            <BetDetails bet={selectedBet} />
          </>
        );
      case "stats":
        return (
          <>
            <button onClick={() => setPage("home")} style={styles.backButton}>⬅ Back</button>
            <UpdateBet bet={selectedBet} />
          </>
        );
      case "profile":
        return <ProfilePage user={user} onLogout={handleLogout} />;
      case "settings":
        return <SettingsPage />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div style={styles.wrapper}>
      {showSuccess && <div style={styles.successToast}>🎉 New Bet Created Successfully!</div>}
      <div style={styles.content}>{renderPage()}</div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    position: "relative",
  },
  content: {
    width: "100%",
    maxWidth: "600px",
  },
  backButton: {
    alignSelf: "flex-start",
    margin: "10px",
    padding: "6px 12px",
    fontSize: "14px",
    borderRadius: "8px",
    backgroundColor: "#e5e7eb",
    border: "none",
    cursor: "pointer",
  },
  successToast: {
    position: "fixed",
    top: "20px",
    backgroundColor: "#4ade80",
    color: "#065f46",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: "bold",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease-in-out",
  },
};
