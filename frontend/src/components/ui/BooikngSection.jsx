import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function BookingSection() {
  const navigate = useNavigate();
  const [isGuide, setIsGuide] = useState(false);

  const getBooking = async () => {
    const res = await fetch("http://localhost:8080/booking", {
      method: "GET",
      credentials: "include",
    });
  
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  
    return await res.json();
  };

  const { data } = useQuery({
    queryKey: ["fetchBooking"],
    queryFn: getBooking,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const getRole = async () => {
    const res = await fetch("http://localhost:8080/user/role", {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  };

  const role = useQuery({
    queryKey: ["fetchRole"],
    queryFn: getRole,
  });

  const checkRole = (role) => {
    if (role === "GUIDE") {
      setIsGuide(true);
    }
  };
  
  if (role.data?.data?.role) {
    checkRole(role.data.data.role);
  }

  return (
    <>
      <div className="p-6 bg-white rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bookings</h2>
          <a href="/calender" className="text-blue-500 text-sm">
            See more
          </a>
        </div>
        
        {(!data?.data || data.data.length === 0) ? (
          <div className="py-8 text-center">
            <p className="text-gray-500 text-lg">No bookings yet</p>
            <p className="text-gray-400 text-sm mt-2">Your upcoming bookings will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {data.data.map((booking, index) => (
              <div
                key={index}
                className={`p-4 bg-gray-50 rounded-xl shadow-sm flex justify-between border-l-4 ${
                  booking.status === "PENDING"
                    ? "border-yellow-500"
                    : "border-green-500"
                }`}
              >
                <div className="hover:cursor-pointer" onClick={() => navigate('/calender')}>
                  <h3 className="font-medium text-lg">
                    {isGuide ? booking.user.user_name : booking.guide.user_name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {isGuide ? booking.user.user_email : booking.guide.user_email}
                  </p>
                </div>
                <p className="text-gray-500 text-sm">{booking.booking_date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}