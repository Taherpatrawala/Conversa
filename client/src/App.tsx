import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";

import Navbar from "./components/Navbar";

import ChatRoom from "./components/ChatRoom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/chat" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
