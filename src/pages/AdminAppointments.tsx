import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

const ADMIN_EMAIL = "ajayshsh7@gmail.com"; 

type Appointment = {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
};

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const snapshot = await getDocs(collection(db, "appointments"));
      const data: Appointment[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Appointment[];

      setAppointments(data);
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  // Restrict access to admin only
  if (auth.currentUser?.email !== ADMIN_EMAIL) {
    return <div className="text-center mt-10 text-red-600">Not authorized.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6">All Booked Appointments</h2>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td className="p-2 border">{appt.date}</td>
                <td className="p-2 border">{appt.time}</td>
                <td className="p-2 border">{appt.name}</td>
                <td className="p-2 border">{appt.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
