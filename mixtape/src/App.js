import "./App.css";
import Landing from "./components/Landing";
import PermanentDrawerLeft from "./components/Sidebar.jsx";
import Profile from "./components/Profile.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Player from "./components/Player";
import PasswordReset from "./components/PasswordReset";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/sidebar" element={<PermanentDrawerLeft />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/player" element={<Player />}></Route>
        <Route path="/passwordreset" element={<PasswordReset />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
