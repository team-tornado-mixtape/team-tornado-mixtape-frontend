import "./App.css";
import React from "react";
import useLocalStorageState from "use-local-storage-state";
import axios from "axios";
import Landing from "./components/Landing";
import PermanentDrawerLeft from "./components/Sidebar.jsx";
import Profile from "./components/Profile.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Player from "./components/Player";
import PasswordReset from "./components/PasswordReset";
import ResetForm from "./components/ResetForm";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Rack from "./components/Rack";
import MixCreate from "./components/MixCreate/MixStepper/Songs";
import Sidebar from "./components/Sidebar";

function App() {
  const [token, setToken] = useLocalStorageState("reactMixtapeToken", "");
  const [username, setUsername] = useLocalStorageState(
    "reactMixtapeUsername",
    ""
  );

  const setAuth = (username, token) => {
    setToken(token);
    setUsername(username);
  };

  const isLoggedIn = username && token;

  const handleLogout = () => {
    axios
      .post(
        "https://team-tornado-mixtape.herokuapp.com/api/auth/token/logout",
        {},
        {
          headers: { Authorization: `token ${token}` },
        }
      )
      .then((res) => {
        setAuth("", "");
      });
  };

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <>
          <PermanentDrawerLeft isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} token={token} />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Landing setAuth={setAuth} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}></Route>
          <Route path="/signup" element={<SignUp isLoggedIn={isLoggedIn} />}></Route>
          <Route path="/passwordreset" element={<PasswordReset />}></Route>
          <Route path="/resetform" element={<ResetForm isLoggedIn={isLoggedIn} />}></Route>
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App;
