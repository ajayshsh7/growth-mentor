import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import type { User } from "firebase/auth";

const ADMIN_EMAIL = "ajayshsh7@gmail.com";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // Close mobile menu on desktop view
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <header className="bg-white shadow-md px-4 py-3 md:px-6 relative">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-indigo-700">Growth Mentor</Link>

        {/* Hamburger Icon - visible on small screens only */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 18L18 6M6 6l12 12" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Nav - hidden on mobile */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/about" className="hover:text-indigo-600">About</Link>
          <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
          {user ? (
            <Link
              to={isAdmin ? "/admin-dashboard" : "/profile"}
              className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
            >
              {isAdmin ? "Dashboard" : "My Profile"}
            </Link>
          ) : (
            <Link to="/login" className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">
              Sign In
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Nav - only visible when isMenuOpen is true */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 flex flex-col items-center space-y-2 text-gray-700 font-medium">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-600">Home</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-600">About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-indigo-600">Contact</Link>
          {user ? (
            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">
              My Profile
            </Link>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">
              Sign In
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
