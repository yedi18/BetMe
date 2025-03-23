import { useState } from "react";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      direction: "rtl"
    }}>
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>שלום {user.displayName} 👋</h2>
          <p>ברוך הבא ל־BetMe!</p>
        </div>
      )}
    </div>
  );
}

export default App;
