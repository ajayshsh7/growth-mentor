import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const ADMIN_EMAIL = "ajayshsh7@gmail.com";

export default function AdminDashboard() {
    if (auth.currentUser?.email !== ADMIN_EMAIL) {
        return (
          <div className="text-center mt-10 text-red-600">
            You are not authorized to access this page.
          </div>
        );
      }
      const navigate = useNavigate();

const handleLogout = async () => {
  await signOut(auth);
  navigate("/login");
};
  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="space-y-4">
        <Link
          to="/admin-scheduler"
          className="block px-4 py-2 bg-blue-500 text-white rounded text-center hover:bg-blue-600"
        >
          Schedule Time Slots
        </Link>

        <Link
          to="/admin-appointments"
          className="block px-4 py-2 bg-white border text-gray-700 rounded text-center hover:bg-blue-500 hover:text-white hover:border p-4"
        >
          View Booked Appointments
        </Link>
        <button
  onClick={handleLogout}
  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
>
  Logout
</button>
      </div>
    </div>
  );
}
