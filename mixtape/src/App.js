import "./App.css";
import ComponentToggler from "./components/Landing"
import Landing from "./components/Landing";
import PermanentDrawerLeft from "./components/Sidebar.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/sidebar" element={<PermanentDrawerLeft />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
