// src/pages/UserProfile.tsx
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export default function UserProfile() {
  const currentUser = auth.currentUser;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [editing, setEditing] = useState(true); // true when user can type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setName(data.name || "");
        setAge(data.age || "");
        setEmail(data.email || currentUser.email || "");
        setEditing(false); // disable editing if data exists
      } else {
        setEmail(currentUser.email || "");
        setEditing(true); // enable editing for first time
      }

      setLoading(false);
    };

    fetchProfile();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(userRef, {
      name,
      age,
      email,
    });

    setEditing(false);
    alert("Profile saved successfully!");
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            disabled={!editing}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Age</label>
          <input
            type="number"
            value={age}
            disabled={!editing}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 border rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-2 border rounded mt-1 bg-gray-100"
          />
        </div>

        <div className="flex gap-4 mt-6">
          {editing ? (
            <button
              onClick={handleSave}
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          )}
        </div>
        <div className="flex gap-2 sm:gap-4 md:gap-4">
          <button
            onClick={handleLogout}
            className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/book")}
            className="cursor-pointer bg-indigo-400 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >
            Book Appointment
          </button>
        </div>
        <button
          onClick={() => navigate("/My-appointments")}
          className="mt-8 bg-white-600 text-gray-700 px-4 py-2 rounded border border-gray-700 hover:bg-blue-700 hover:text-white cursor-pointer"
        >
          My Appointments
        </button>
      </div>
    </div>
  );
}
