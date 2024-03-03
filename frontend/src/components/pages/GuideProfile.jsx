import { useState, useEffect } from "react";
import { MapPin, Languages, DollarSign, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Building2 } from "lucide-react";
import { Phone } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NavbarComponent from "../ui/NavbarComponent";
import SidebarComponent from "../ui/SidebarComponent";

export default function GuideProfile() {
  const { id } = useParams();
  const [hasName, setHasName] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [date, setDate] = useState("");

  // Get tomorrow's date in YYYY-MM-DD format for min date restriction
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const getProfile = async () => {
    const res = await fetch("http://localhost:8080/user", {
      method: "GET",
      credentials: "include"
    });
    return await res.json();
  };

  const profileData = useQuery({
    queryKey: ["fetchProfile"],
    queryFn: getProfile
  });

  useEffect(() => {
    // Check if user has a name and is a USER
    if (profileData.data?.data) {
      const userData = profileData.data.data;
      setHasName(!!userData.user_name); // Convert to boolean
      setShowBtn(!!userData.user_name && userData.user_role === "USER");
    }
  }, [profileData.data]);

  const onChange = (e) => {
    setDate(e.target.value);
  };

  const addBooking = async () => {
    try {
      const res = await fetch(`http://localhost:8080/booking/${id}`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ booking_date: date }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setDate("");
      toast(data.message);
    } catch (error) {
      toast.error("Failed to create booking. Please try again.");
    }
  };

  const getGuideProfile = async () => {
    const res = await fetch(`http://localhost:8080/user/${id}`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  };

  const { data } = useQuery({
    queryKey: ["fetchGuideProfile"],
    queryFn: getGuideProfile,
  });

  return (
    <>
      <div className="h-screen w-screen overflow-hidden flex flex-col">
        <NavbarComponent />
        <div className="flex h-full w-full">
          <SidebarComponent />
          <div className="min-h-screen bg-gray-50 flex-1 flex flex-col items-center">
            <div className="max-w-4xl mx-auto p-4 md:py-8">
              <div className="bg-white rounded-xl shadow-sm p-8">
                {/* Profile Header */}
                <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img
                      src={`http://localhost:8080/${data?.data?.user_profile}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    name="user_name"
                    disabled
                    value={data?.data?.user_name}
                    className="w-full max-w-md text-center text-2xl font-semibold bg-transparent focus:outline-none placeholder:text-lg placeholder:text-gray-500"
                  />
                  <input
                    type="email"
                    name="user_email"
                    disabled
                    value={data?.data?.user_email}
                    placeholder="example@guide.com"
                    className="w-full max-w-md text-center text-sm text-gray-500 bg-transparent focus:outline-none mt-1"
                  />
                </div>

                {/* Profile Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <label className="block text-sm text-gray-500 mb-1">
                        Phone:
                      </label>
                      <input
                        type="tel"
                        name="user_phone"
                        disabled
                        value={data?.data?.user_phone}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <label className="block text-sm text-gray-500 mb-1">
                        Address:
                      </label>
                      <input
                        type="text"
                        name="user_address"
                        disabled
                        value={data?.data?.user_address}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Languages className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <label className="block text-sm text-gray-500 mb-1">
                        Language:
                      </label>
                      <input
                        type="text"
                        name="user_language"
                        disabled
                        value={data?.data?.user_language}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div
                    className={`flex items-start gap-3 ${
                      data?.data?.user_role === "USER" ? "hidden" : "block"
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <label className="block text-sm text-gray-500 mb-1">
                        Tour Location:
                      </label>
                      <input
                        type="text"
                        name="user_tourlocation"
                        disabled
                        value={data?.data?.user_tourlocation}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div></div>

                  <div
                    className={`flex items-start gap-3 ${
                      data?.data?.user_role === "USER" ? "hidden" : "block"
                    }`}
                  >
                    <DollarSign className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <label className="block text-sm text-gray-500 mb-1">
                        Hourly Rate:
                      </label>
                      <input
                        type="number"
                        name="user_rate"
                        disabled
                        value={data?.data?.user_rate}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div
                    className={`col-span-full mt-2 ${
                      data?.data?.user_role === "USER" ? "hidden" : "block"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-lg font-medium">
                        {data?.data?.user_rating ? data?.data?.user_rating : 0}
                      </span>
                      <span className="text-sm text-gray-500">rating</span>
                    </div>
                  </div>
                  
                  {/* Message for users without a complete profile */}
                  {!hasName && profileData?.data?.data?.user_role === "USER" && (
                    <div className="col-span-full mt-4">
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                        <p className="text-yellow-700">Please complete your profile before booking a guide.</p>
                      </div>
                    </div>
                  )}

                  {/* Message for guides trying to book */}
                  {profileData?.data?.data?.user_role === "GUIDE" && (
                    <div className="col-span-full mt-4">
                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-center">
                        <p className="text-orange-700">You cannot make bookings while working as a guide.</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Booking section for valid users */}
                  {showBtn && (
                    <div className="col-span-full flex gap-10">
                      <input
                        type="date"
                        name="booking_date"
                        onChange={onChange}
                        value={date}
                        min={minDate}
                        className="w-full flex justify-center items-center px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        disabled={!date}
                        onClick={addBooking}
                        className="w-full px-3 py-2 disabled:bg-purple-900 border rounded-md bg-purple-500 hover:bg-purple-700 hover:cursor-pointer text-white"
                      > 
                        Book Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}