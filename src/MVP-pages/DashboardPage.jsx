import '../index.css';
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../mainPart/firebase";
import NewBet from "../MVP-pages/NewBetPage";
import BetDetails from "../MVP-pages/BetDetailsPage";
import UpdateBet from "../MVP-pages/UpdatePage";
import MainDashboardView from "../MVP-pages/MainDashboardView";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../mainPart/firebase";



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
  const handleDeleteBet = async (bet) => {
    const confirm = window.confirm("Are you sure you want to delete this bet?");
    if (!confirm) return;
  
    try {
      console.log("Trying to delete:", bet);
      await deleteDoc(doc(db, "bets", bet.id));
      setBets((prev) => prev.filter((b) => b.id !== bet.id));
    } catch (err) {
      console.error("Failed to delete bet:", err);
    }
  };
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);
  useEffect(() => {
    if (user) fetchBets();
  }, [user]);
  const fetchBets = async () => {
    try {
      const q = query(
        collection(db, "bets"),
        where("createdBy", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      const betsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "Untitled Bet",
          status: "In Progress",
          opponent: data.participants?.[0] || "Unknown",
          opponentPhoto: "/default-avatar.png",
          yourProgress: 0,
          opponentProgress: 0,
          date: data.deadline || "TBD",
          createdAt: data.createdAt?.toDate?.() || new Date(),
        };
      });
  
      // מיין לפי תאריך מהחדש לישן
      betsData.sort((a, b) => b.createdAt - a.createdAt);
  
      // סמן את הראשון כ־isNew
      const finalBets = betsData.map((bet, index) => ({
        ...bet,
        isNew: index === 0,
      }));
  
      setBets(finalBets);
    } catch (error) {
      console.error("Failed to fetch bets:", error);
    }
  };  
   
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
            onDeleteBet={handleDeleteBet}
          />
        );
      case "newbet":
        return <NewBet onBack={() => setPage("home")} onFinish={handleNewBetFinish} />;
      case "bets":
        return (
          <>
            <button onClick={() => setPage("home")} style={styles.backButton}>⬅ Back</button>
            <BetDetails bet={selectedBet} setPage={setPage}/>
          </>
        );
      case "stats":
        return (
          <>
            <button onClick={() => setPage("home")} style={styles.backButton}>⬅ Back</button>
            <UpdateBet bet={selectedBet}/>
          </>
        );
      case "settings":
        return <SettingsPage />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div style={styles.wrapper}>
      {showSuccess &&<div style={{...styles.successToast,...(showSuccess ? {} : styles.successToastHidden),}}>🎉 New Bet Created Successfully!</div>}
      <div style={styles.content}>{renderPage()}</div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    maxWidth: "330px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f9fafb",
    position: "relative",
  },
  content: {
    justifyContent: "flex-start",
    margin: "0px",
    width: "100%",
    maxWidth: "330px",
    height: "100vh",  
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
    transition: "opacity 0.8s ease-in-out",
    opacity: 1,
  },
  successToastHidden: {
    opacity: 0,
  },
};
