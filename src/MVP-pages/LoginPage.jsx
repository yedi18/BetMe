// רכיב React שמציג מסך התחברות משתמש באמצעות Google.
// לאחר ההתחברות, הוא שומר את המשתמש למסד הנתונים ואם אין לו nickname שואל אותו לבחור אחד.

import { loginWithGoogle } from "../mainPart/firebase";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../mainPart/firebase";
import { doc, getDoc, setDoc, query, collection, where, getDocs } from "firebase/firestore";

function Login({ onLogin }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState("");
  const [nicknameStep, setNicknameStep] = useState(false);
  const [checkingNick, setCheckingNick] = useState(false);
  const [nickError, setNickError] = useState("");

  const saveUserToFirestore = async (user, nickname = null) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
  
      const userData = {
        email: user.email || "",
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      };
  
      if (!userSnap.exists()) {
        console.log("📄 User does not exist. Creating...");
        await setDoc(userRef, {
          ...userData,
          nickname: nickname || "",
        });
        console.log("✅ User created with nickname:", nickname);
      } else if (nickname) {
        console.log("📝 User exists. Updating nickname to:", nickname);
        await setDoc(userRef, {
          ...userSnap.data(),
          ...userData,
          nickname,
        }, { merge: true });
      }
    } catch (err) {
      console.error("❌ Failed to save user:", err);
    }
  };
  

  const checkNicknameAvailable = async (nick) => {
    try {
      const q = query(collection(db, "users"), where("nickname", "==", nick));
      const snapshot = await getDocs(q);
      return snapshot.empty;
    } catch (err) {
      console.error("❌ Failed to check nickname availability:", err);
      return false;
    }
  };

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const result = await loginWithGoogle();
      const u = result.user;
      const userRef = doc(db, "users", u.uid);
      const userSnap = await getDoc(userRef);
      const nick = userSnap.data()?.nickname?.trim();

      console.log("👤 Logged in as:", u.displayName);

      if (!userSnap.exists() || !nick) {
        console.log("🆕 Need to collect nickname");
        setUser(u);
        setNicknameStep(true);
      } else {
        console.log("➡️ User has nickname, proceeding to app");
        onLogin(u);
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("התחברות נכשלה. נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetNickname = async () => {
    setCheckingNick(true);
    setNickError("");

    try {
      if (!nickname.trim()) {
        setNickError("נא להזין כינוי ייחודי.");
        return;
      }

      console.log("🔎 Checking nickname:", nickname);
      const isAvailable = await checkNicknameAvailable(nickname.trim());

      if (!isAvailable) {
        setNickError("הכינוי תפוס. נסה אחד אחר.");
        return;
      }

      await saveUserToFirestore(user, nickname.trim());
      console.log("✅ Nickname saved. Logging in.");
      onLogin(user);
    } catch (err) {
      console.error("❌ Failed during nickname set:", err);
      setNickError("אירעה שגיאה. נסה שוב.");
    } finally {
      setCheckingNick(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        direction: "rtl",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "0px auto",
        padding: "40px",
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
        width: "90%",
        maxWidth: "500px",
      }}
    >
      <h1 style={{
        backgroundColor: "#3b82f6",
        color: "white",
        padding: "20px 40px",
        borderRadius: "40px",
        fontSize: "2.4rem",
        marginBottom: "30px",
        display: "inline-block",
        boxShadow: "0 5px 20px rgba(59,130,246,0.4)"
      }}>
        🎯 ברוך הבא ל־<b>BetMe</b>
      </h1>

      {nicknameStep ? (
        <>
          <p>אנא בחר כינוי ייחודי לזיהוי:</p>
          <input
            placeholder="כינוי קצר ונוח"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{ padding: 10, marginTop: 10, borderRadius: 8, width: "100%" }}
          />
          {nickError && <p style={{ color: "red" }}>{nickError}</p>}
          <button
            onClick={handleSetNickname}
            disabled={checkingNick}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              marginTop: "15px",
              cursor: "pointer"
            }}
          >
            {checkingNick ? "בודק..." : "שמור והמשך"}
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            borderRadius: "30px",
            border: "2px solid #3b82f6",
            backgroundColor: "#ffffff",
            color: "#3b82f6",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#3b82f6";
            e.target.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#ffffff";
            e.target.style.color = "#3b82f6";
          }}
        >
          🚀 התחבר עם Google
        </button>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>
          {error}
        </p>
      )}
    </motion.div>
  );
}

export default Login;
