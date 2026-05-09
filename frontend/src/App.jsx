import { Routes, Route } from "react-router-dom";
import { AuthProvider }   from "./context/AuthContext";
import ProtectedRoute     from "./components/ProtectedRoute";
import Navbar             from "./components/Navbar";
import Home               from "./pages/Home";
import Login              from "./pages/Login";
import Chat               from "./pages/Chat";
import Confirmation       from "./pages/Confirmation";
import MyBookings from "./pages/MyBookings";
export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute><Chat /></ProtectedRoute>
        } />
        <Route path="/confirmation/:ref" element={
          <ProtectedRoute><Confirmation /></ProtectedRoute>
        } />
        <Route path="/my-bookings" element={
  <ProtectedRoute><MyBookings /></ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}