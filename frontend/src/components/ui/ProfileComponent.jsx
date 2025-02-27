import { useState, useEffect } from 'react';
import { MapPin, Languages, DollarSign, Star, Building2, Phone } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    user_role: "USER", // Default role
    user_name: "",
    user_email: "",
    user_phone: "",
    user_address: "",
    user_language: "",
    user_tourlocation: "",
    user_rate: "",
    user_rating: 0
  });
  
  // Keep track of the current role from the database
  const [currentRole, setCurrentRole] = useState("USER");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:8080/user", {
        method: "GET",
        credentials: "include"
      });
      return await res.json();
    } catch (error) {
      console.error("Error fetching profile:", error);
      return { data: null };
    }
  };

  // Simulate useQuery behavior
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await getProfile();
      if (result?.data) {
        setProfileData(result.data);
        // Set the current role from the database
        setCurrentRole(result.data.user_role || "USER");
      }
    } catch (error) {
      console.error("Error in fetchData:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    setIsEditing(true);
  };

  const handleRoleToggle = (role) => {
    setProfileData(prevData => ({
      ...prevData,
      user_role: role
    }));
    
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:8080/user", {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(profileData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      const responseData = await res.json();
      
      if (res.ok) {
        toast.success(responseData.message || "Profile updated successfully");
        fetchData(); // Refresh the data after update
      } else {
        toast.error(responseData.message || "Failed to update profile");
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex-1 flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex-1">
      <div className="max-w-4xl mx-auto p-4 md:py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <img
                src={`http://localhost:8080/${profileData?.user_profile || 'default-profile.jpg'}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="text"
              name="user_name"
              value={profileData?.user_name || ''}
              onChange={handleInputChange}
              className="w-full max-w-md text-center text-2xl font-semibold bg-transparent focus:outline-none placeholder:text-lg placeholder:text-gray-500"
              placeholder='Fill out your name'
            />
            <input
              type="email"
              name="user_email"
              value={profileData?.user_email || ''}
              onChange={handleInputChange}
              placeholder='example@guide.com'
              className="w-full max-w-md text-center text-sm text-gray-500 bg-transparent focus:outline-none mt-1"
            />
          </div>

          {/* Role Toggle */}
          <div className="mb-6">
            <label className="block text-sm text-gray-500 mb-2">I am a:</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleRoleToggle("USER")}
                className={`px-4 py-2 rounded-md ${
                  profileData?.user_role === "USER"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Traveler
              </button>
              <button
                type="button"
                onClick={() => handleRoleToggle("GUIDE")}
                className={`px-4 py-2 rounded-md ${
                  profileData?.user_role === "GUIDE"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Guide
              </button>
            </div>
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
                  value={profileData?.user_phone || ''}
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
                  value={profileData?.user_address || ''}
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
                  value={profileData?.user_language || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {currentRole === "GUIDE" && (
              <>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-500 mb-1">Tour Location:</label>
                    <input
                      type="text"
                      placeholder='Kathmandu, Nepal'
                      name="user_tourlocation"
                      value={profileData?.user_tourlocation || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-gray-400 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <label className="block text-sm text-gray-500 mb-1">Hourly Rate:</label>
                    <input
                      type="number"
                      name="user_rate"
                      placeholder='75'
                      value={profileData?.user_rate || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="col-span-full mt-2">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-lg font-medium">{profileData?.user_rating || 0}</span>
                    <span className="text-sm text-gray-500">rating</span>
                  </div>
                </div>
              </>
            )}
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

export default ProfileComponent;