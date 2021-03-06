import "./App.css";
import React from "react";
import useLocalStorageState from "use-local-storage-state";
import axios from "axios";
import Landing from "./components/NotLoggedIn/Landing/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/NotLoggedIn/Landing/SignUp";
import Sidebar from "./components/LoggedIn/Sidebar";

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
          <Sidebar isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} token={token} />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Landing setAuth={setAuth} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}></Route>
          <Route path="/signup" element={<SignUp isLoggedIn={isLoggedIn} setAuth={setAuth} />}></Route>
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App;
