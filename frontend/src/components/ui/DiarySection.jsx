import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function DiarySection() {
  const navigate = useNavigate();

  const getDiaries = async () => {
    const res = await fetch("http://localhost:8080/diary", {
      method: "GET",
      credentials: "include",
    });
  
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  
    return await res.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchDiaries"],
    queryFn: getDiaries,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return (
    <>
      <div className="p-6 bg-white rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Travel Diaries</h2>
          <a href="/diaries" className="text-blue-500 text-sm">
            See all
          </a>
        </div>
        
        {isLoading ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">Loading diaries...</p>
          </div>
        ) : isError ? (
          <div className="py-8 text-center">
            <p className="text-red-500">Failed to load diaries</p>
          </div>
        ) : (!data?.data || data.data.length === 0) ? (
          <div className="py-8 text-center">
            <p className="text-gray-500 text-lg">No diaries created yet</p>
            <p className="text-gray-400 text-sm mt-2">Your travel memories will appear here</p>
            <button 
              onClick={() => navigate('/diary')}
              className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Create your first diary
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.data.map((diary, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/diary`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{diary.diary_title}</h3>
                  <p className="text-gray-500 text-xs">{diary.diary_date}</p>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{diary.diary_location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}