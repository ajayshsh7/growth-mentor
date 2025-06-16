import { useEffect, useState } from "react";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

type Appointment = {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
};

export default function MyAppointments() {
    const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;
  

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!currentUser) return;

      const q = query(collection(db, "appointments"), where("userId", "==", currentUser.uid));
      const snapshot = await getDocs(q);

      const data: Appointment[] = snapshot.docs.map((docSnap) => {
        const docData = docSnap.data();
        return {
          id: docSnap.id,
          date: docData.date,
          time: docData.time,
          name: docData.name || "",
          email: docData.email || "",
        };
      });

      setAppointments(data);
      setLoading(false);
    };

    fetchAppointments();
  }, [currentUser]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "appointments", id));
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>You have no appointments yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td className="p-2 border">{appt.date}</td>
                <td className="p-2 border">{appt.time}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(appt.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                  <button onClick={() =>
    window.open("https://book.stripe.com/test_dRmfZjgYc40F8QHcGT0oM00", "_blank")}
    className="bg-blue-600 text-white px-3 py-1 rounded"
  >
    Pay Now
  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
          onClick={() => navigate("/book")}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Book Appointment
        </button>
    </div>
  );
}
