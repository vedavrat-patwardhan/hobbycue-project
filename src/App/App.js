import React, { useEffect, useState } from "react";
import LandingPage from "../Pages/LandingPage";
import Profile from "../Pages/Profile";
import "./App.css";

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    sessionStorage.getItem("page") !== null &&
      setSignedIn(sessionStorage.getItem("page"));
  }, []);

  return <div className="app">{signedIn ? <Profile /> : <LandingPage />}</div>;
}
