import { useQuery } from "@tanstack/react-query";

export default function BooikngSection() {
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

  console.log(data?.data);

  const bookings = [
    { name: "John Doe", address: "123 Main St, NY", date: "24 Feb 2025" },
    { name: "Jane Smith", address: "456 Elm St, CA", date: "23 Feb 2025" },
    { name: "Alice Brown", address: "789 Pine St, TX", date: "22 Feb 2025" },
    { name: "Bob White", address: "321 Oak St, FL", date: "21 Feb 2025" },
  ];
  return (
    <>
      <div className="p-6 bg-white rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bookings</h2>
          <a href="#" className="text-blue-500 text-sm">
            See more
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {data?.data.map((booking, index) => (
            <div
              key={index}
              className={`p-4 bg-gray-50 rounded-xl shadow-sm flex justify-between border-l-4 ${
                booking.status === "PENDING"
                  ? "border-yellow-500"
                  : "border-green-500"
              }`}
            >
              <div>
                <h3 className="font-medium text-lg">
                  {booking.guide.user_name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {booking.guide.user_email}
                </p>
              </div>
              <p className="text-gray-500 text-sm">{booking.booking_date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
