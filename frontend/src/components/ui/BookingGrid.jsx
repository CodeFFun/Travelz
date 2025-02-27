import { useQuery} from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export default function BookingGrid() {

  const getBooking = async () => {
    const res = await fetch("http://localhost:8080/booking", {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  };

  const { data } = useQuery({
    queryKey: ["fetchBooking"],
    queryFn: getBooking,
  });

  // State to track which cards are being edited
  const [editStates, setEditStates] = useState({});
  // State to track temporary date changes
  const [tempDates, setTempDates] = useState({});


  const handleEdit = (id) => {
    // Set this card to edit mode
    setEditStates({
      ...editStates,
      [id]: true,
    });
    
    // Initialize temp date with the current booking date
    const currentBooking = data?.data.find(booking => booking.id === id);
    if (currentBooking) {
      setTempDates({
        ...tempDates,
        [id]: currentBooking.booking_date,
      });
    }
  };

  const handleDateChange = (id, newDate) => {
    // Update the temporary date for this booking
    setTempDates({
      ...tempDates,
      [id]: newDate,
    });
  };

  const handleSubmit = async (id) => {
    // Exit edit mode
    setEditStates({
      ...editStates,
      [id]: false,
    });

    console.log(id)
    
    // Submit the updated date
    const res = await fetch(`http://localhost:8080/booking/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ booking_date: tempDates[id] }),
      });
      const data = await res.json()
      window.location.reload()
      toast.success(data.message)
  };

  const handleDelete = async (id) => {
    // Confirm before deletion
    const res = await fetch(`http://localhost:8080/booking/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json()
      window.location.reload()
      toast.warning(data.message)
  };

  if (!data?.data) {
    return <div className="text-center p-4">Loading bookings...</div>;
  }

  return (
    <div className="max-w-[80vw] mx-30 pb-10">
      <div className="grid grid-cols-3 gap-4">
        {data.data.map((card) => (
          <div key={card.booking_id} className="bg-white shadow-md p-2 rounded-lg flex flex-col w-full">
            <div className="w-full mb-1">
              <div className="flex justify-between items-start text-xs gap-10">
                <div className="text-left overflow-hidden">
                  <span className="font-semibold truncate block">{card.user.user_name}</span>
                  <p className="text-gray-600 truncate">{card.user.user_email}</p>
                </div>

                <div className="text-right overflow-hidden ml-1">
                  <span className="font-semibold truncate block">{card.guide.user_name}</span>
                  <p className="text-gray-600 truncate">{card.guide.user_email}</p>
                </div>
              </div>

              <div className="mt-1 text-center py-5">
                {editStates[card.booking_id] ? (
                  <input
                    type="date"
                    className="border p-1 rounded text-xs w-full"
                    value={tempDates[card.booking_id] || card.booking_date}
                    onChange={(e) => handleDateChange(card.booking_id, e.target.value)}
                  />
                ) : (
                  <span className="text-gray-600 text-xs">{card.booking_date}</span>
                )}
              </div>
            </div>

            <div className="flex-grow"></div>

            <div className="flex justify-end gap-1 mt-auto">
              <button
                onClick={() => (editStates[card.booking_id] ? handleSubmit(card.booking_id) : handleEdit(card.booking_id))}
                className={`px-2 py-1 text-white rounded text-xs ${
                  editStates[card.booking_id] ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {editStates[card.booking_id] ? "Save" : "Edit"}
              </button>
              <button
                onClick={() => handleDelete(card.booking_id)}
                className="px-2 py-1 bg-red-500 text-white rounded text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}