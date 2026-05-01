import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Confirmation from "./pages/Confirmation";

export default function App() {
  return (
    <Routes>
      <Route path="/"                    element={<Home />} />
      <Route path="/chat"                element={<Chat />} />
      <Route path="/confirmation/:ref"   element={<Confirmation />} />
    </Routes>
  );
}