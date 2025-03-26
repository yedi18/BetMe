import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NewBet from "./NewBet"; // 👈 אל תשכח לייבא
import DashboardApp from "./DashboardApp";

function App() {
  const [user, setUser] = useState(null);
  const [showNewBet, setShowNewBet] = useState(false); // ⬅️ ניהול מצב התערבות חדשה

  if (!user) {
    return (
      <div style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        direction: "rtl",
        background: "#e0f2ff", // רקע אחיד ונעים
      }}>
        <Login onLogin={setUser} />
      </div>
    );
  }
  
  

  if (showNewBet) {
    return (
      <NewBet user={user} onBack={() => setShowNewBet(false)} />
    );
  }

  return (
    <DashboardApp
      user={user}
      onLogout={() => setUser(null)}
      onCreateBet={() => setShowNewBet(true)}
    />
  );
}

export default App;
