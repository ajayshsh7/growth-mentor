import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../firebase";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "ajayshsh7@gmail.com";



export default function AdminScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const timeSlots = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

  // 🚫 Restrict non-admins
  if (auth.currentUser?.email !== ADMIN_EMAIL) {
    return (
      <div className="text-center mt-10 text-red-600">
        You are not authorized to access this page.
      </div>
    );
  }

  const handleToggleTime = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSaveSlots = async () => {
    if (!selectedDate || selectedTimes.length === 0) return;

    const dateStr = selectedDate.toISOString().split("T")[0];
    const slotRef = doc(db, "slots", dateStr);

    await setDoc(slotRef, {
      times: selectedTimes,
    });

    alert("Slots saved successfully!");
    setSelectedTimes([]);
    setSelectedDate(null);
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin: Set Available Slots</h2>

      <label className="block mb-2">Select Date</label>
      <DatePicker
        selected={selectedDate}
        onChange={setSelectedDate}
        filterDate={isWeekday}
        dateFormat="yyyy-MM-dd"
        className="w-full px-4 py-2 border rounded mb-4"
      />

      <label className="block mb-2">Select Time Slots</label>
      <div className="flex flex-wrap gap-2 mb-4">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => handleToggleTime(time)}
            className={`px-3 py-1 rounded border ${selectedTimes.includes(time)
                ? "bg-green-600 text-white"
                : "bg-gray-100"
              }`}
          >
            {time}
          </button>
        ))}
      </div>

      <div className="flex gap-2 sm:gap-4 md:gap-2">
        <button
          onClick={handleSaveSlots}
          className="bg-blue-600 text-white px-4 py-2 rounded ">
          Save Slots
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
