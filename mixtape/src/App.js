import "./App.css";
import React from 'react';
import useLocalStorageState from 'use-local-storage-state'
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
import MixCreate from "./components/MixCreate";


function App() {
  const [token, setToken] = useLocalStorageState('reactMixtapeToken', '')
  const [username, setUsername] = useLocalStorageState(
    'reactMixtapeUsername',
    ''
  )

  const setAuth = (username, token) => {
    setToken(token)
    setUsername(username)
  }

  const isLoggedIn = username && token

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/sidebar" element={<PermanentDrawerLeft />}></Route>
        <Route path="/profile" isLoggedIn={isLoggedIn} username={username} element={<Profile />}></Route>
        <Route path="/player" element={<Player />}></Route>
        <Route path="/passwordreset" element={<PasswordReset />}></Route>
        <Route path="/resetform" element={<ResetForm />}></Route>
        <Route path="/signin" setAuth={setAuth}
          isLoggedIn={isLoggedIn} element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/rack" element={<Rack />}></Route>
        <Route path="/mixcreate" element={<MixCreate />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
