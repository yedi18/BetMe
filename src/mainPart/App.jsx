import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../mainPart/firebase";

import Login from "../MVP-pages/LoginPage.jsx";
import Dashboard from "../MVP-pages/DashboardPage.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasNickname, setHasNickname] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        const nickname = userSnap.data()?.nickname?.trim();
        setHasNickname(!!nickname);
      } else {
        setUser(null);
        setHasNickname(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>טוען...</div>;

  if (!user || !hasNickname) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          direction: "rtl",
          background: "#e0f2ff",
        }}
      >
        <Login onLogin={(u) => {
          setUser(u);
          setHasNickname(true);
        }} />
      </div>
    );
  }

  return <Dashboard user={user} onLogout={() => setUser(null)} />;
}

export default App;
