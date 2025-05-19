import React, { useState, useEffect } from "react";
import { CometChatConversationsWithMessages } from "@cometchat-pro/react-ui-kit";
import { CometChat } from "@cometchat-pro/chat";
import "./App.css";

function App() {
  const [uid, setUid] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const appID = "275734c8e3eb0bbb"; // Replace with your CometChat App ID
    const region = "in"; // Replace with your CometChat Region (e.g., "us" or "eu")
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();

    CometChat.init(appID, appSetting).then(
      () => {
        console.log("CometChat initialized successfully");
      },
      (error) => {
        console.error("CometChat initialization failed", error);
        alert("Initialization failed: " + error.message);
      }
    );
  }, []);

  const handleLogin = () => {
    const authKey = "a15ff3c549248442dd67678b39590d9eb8a9bee1"; // Replace with your CometChat Auth Key
    CometChat.login(uid, authKey).then(
      (user) => {
        console.log("Login successful", { user });
        setIsLoggedIn(true);
      },
      (error) => {
        console.error("Login failed", error);
        alert("Login failed: " + error.message);
      }
    );
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {isLoggedIn ? (
        <CometChatConversationsWithMessages />
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>CometChat Login</h2>
          <input
            type="text"
            placeholder="Enter User ID (e.g., user1)"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            style={{ padding: "10px", margin: "10px" }}
          />
          <button
            onClick={handleLogin}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default App;