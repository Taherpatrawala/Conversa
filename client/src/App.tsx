import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Users from "./components/Users";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Users />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
