import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { signInWithGoogle } from "../utils/auth";

const ADMIN_EMAIL = "ajayshsh7@gmail.com";

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.email === ADMIN_EMAIL) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const signedInUser = await signInWithGoogle();
      if (signedInUser.email === ADMIN_EMAIL) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Sign In</h2>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Continue with Google
      </button>
    </div>
  );
}
