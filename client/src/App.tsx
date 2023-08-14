import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
