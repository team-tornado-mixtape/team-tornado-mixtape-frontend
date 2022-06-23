import "./App.css";
import Landing from "./components/Landing";
import PermanentDrawerLeft from "./components/Sidebar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Player from "./components/Player";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/sidebar" element={<PermanentDrawerLeft />}></Route>
        <Route path="/player" element={<Player />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
