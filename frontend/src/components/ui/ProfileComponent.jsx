import  { useState } from 'react';
import { MapPin, Languages, DollarSign, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Building2 } from 'lucide-react';
import { Phone } from 'lucide-react';



export default function ProfileComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const[profileData, setProfileData] = useState({})


  const getProfile = async () => {
    const res = await fetch("http://localhost:8080/user",{
      method:"GET",
      credentials: "include"
    })
    return await res.json();
  }

  const {data} = useQuery({
    queryKey:["fetchProfile"], 
    queryFn: getProfile
  })


  const handleInputChange = (e) => {
    
    setProfileData({
      ...profileData, 
      [e.target.name]: e.target.value
    })
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log(profileData)
    const res = await fetch("http://localhost:8080/user",{
      method:"PATCH",
      credentials: "include",
      body: JSON.stringify(profileData),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = await res.json();
    console.log(data)
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex-1">
      <div className="max-w-4xl mx-auto p-4 md:py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <img
                // src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&auto=format&q=80"
                src={`http://localhost:8080/${data?.data?.user_profile}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="text"
              name="user_name"
              value={data?.data?.user_name}
              onChange={handleInputChange}
              className="w-full max-w-md text-center text-2xl font-semibold bg-transparent focus:outline-none placeholder:text-lg placeholder:text-gray-500"
              placeholder='Fill out your name'
            />
            <input
              type="email"
              name="user_email"
              value={data?.data?.user_email}
              onChange={handleInputChange}
              placeholder='example@guide.com'
              className="w-full max-w-md text-center text-sm text-gray-500 bg-transparent focus:outline-none mt-1"
            />
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1">Phone:</label>
                <input
                  type="tel"
                  name="user_phone"
                  placeholder='+1 (555) 123-4567'
                  value={data?.data?.user_phone }
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1">Address:</label>
                <input
                  type="text"
                  placeholder='San Francisco, CA'
                  name="user_address"
                  value={data?.data?.user_address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Languages className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1">Language:</label>
                <input
                  type="text"
                  name="user_language"
                  placeholder='English, Spanish'
                  value={data?.data?.user_language}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className={`flex items-start gap-3 ${data?.data?.user_role === "USER" ? "hidden" : "block"}`}>
              <Building2 className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1">Tour Location:</label>
                <input
                  type="text"
                  placeholder='Kathmandu, Nepal'
                  name="user_tourlocation"
                  value={data?.data?.user_tourlocation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className={`flex items-start gap-3 ${data?.data?.user_role === "USER" ? "hidden" : "block"}`}>
              <DollarSign className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1">Hourly Rate:</label>
                <input
                  type="number"
                  name="user_rate"
                  placeholder='75'
                  value={data?.data?.user_rate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className={`col-span-full mt-2 ${data?.data?.user_role === "USER" ? "hidden" : "block"}`} >
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-lg font-medium">{data?.data?.user_rating ? data?.data?.user_rating :0}</span>
                <span className="text-sm text-gray-500">rating</span>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end mt-6">
              <button
              
                onClick={handleSave}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}