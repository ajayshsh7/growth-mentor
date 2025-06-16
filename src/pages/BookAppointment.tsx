import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {collection,doc,getDoc,getDocs,query,where,setDoc,} from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [loadingSlots, setLoadingSlots] = useState(false);

  const user = auth.currentUser;

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Monday to Friday only
  };

  // Load slots when date is selected
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate) return;
      setLoadingSlots(true);

      const dateStr = selectedDate.toISOString().split("T")[0];
      const slotDoc = await getDoc(doc(db, "slots", dateStr));

      if (slotDoc.exists()) {
        const data = slotDoc.data();
        const slots: string[] = data.times || [];

        // Filter out already booked slots
        const q = query(
          collection(db, "appointments"),
          where("date", "==", dateStr)
        );
        const bookedSnap = await getDocs(q);
        const bookedSlots = bookedSnap.docs.map((doc) => doc.data().time);

        const available = slots.filter((slot) => !bookedSlots.includes(slot));
        setAvailableSlots(available);
      } else {
        setAvailableSlots([]);
      }

      setLoadingSlots(false);
    };

    fetchSlots();
  }, [selectedDate]);

  const handleBook = async () => {
    if (!user || !selectedDate || !selectedSlot) {
      alert("Missing required fields");
      return;
    }

    const dateStr = selectedDate.toISOString().split("T")[0];
    const appointmentId = `${user.uid}_${dateStr}_${selectedSlot}`;
    const appointmentRef = doc(db, "appointments", appointmentId);

    // Get user profile info
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    let name = "";
    let email = user.email || "";

    if (userSnap.exists()) {
      const data = userSnap.data();
      name = data.name || "";
      email = data.email || email;
    }

    await setDoc(appointmentRef, {
      userId: user.uid,
      name,
      email,
      date: dateStr,
      time: selectedSlot,
      createdAt: new Date().toISOString(),
    //   paymentStatus: doc.data "unpaid",
    });

    alert("Appointment booked!");
    setSelectedSlot("");
    setSelectedDate(null);
    setAvailableSlots([]);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>

      <label className="block mb-2">Select Date</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        filterDate={isWeekday}
        dateFormat="yyyy-MM-dd"
        className="w-full px-4 py-2 border rounded mb-4"
      />

      {loadingSlots && <p>Loading slots...</p>}

      {selectedDate && !loadingSlots && availableSlots.length > 0 && (
        <>
          <label className="block mb-2">Available Slots</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`px-3 py-1 rounded border ${
                  selectedSlot === slot
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <button
            onClick={handleBook}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Confirm Booking
          </button>
        </>
      )}

      {selectedDate && !loadingSlots && availableSlots.length === 0 && (
        <p className="text-red-500">No slots available for this day.</p>
      )}
    </div>
  );
}
