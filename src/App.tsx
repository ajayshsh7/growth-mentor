import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Profile";
import { AuthProvider, useAuth } from "./context/AuthContext";
import type { JSX } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import BookAppointment from "./pages/BookAppointment";
import AdminScheduler from "./pages/AdminScheduler";
import AdminAppointments from "./pages/AdminAppointments";
import MyAppointments from "./pages/MyAppointments";
import HomePage from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Profile from "./pages/Profile";
import Header from "./components/Header";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-appointments"
            element={
              <ProtectedRoute>
                <MyAppointments />
              </ProtectedRoute>
            }
          />
          <Route
        path="/book"
        element={
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        }
      />
          <Route path="/admin-scheduler" element={<AdminScheduler />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-scheduler" element={<AdminScheduler />} />
          <Route path="/admin-appointments" element={<AdminAppointments />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;