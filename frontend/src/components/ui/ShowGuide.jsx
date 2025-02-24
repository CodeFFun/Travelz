import { useQuery } from "@tanstack/react-query";

export default function ShowGuide() {

  const getGuide = async () => {
    const res = await fetch("http://localhost:8080/user/role/guide",{
      method:"GET",
      credentials: "include"
    })
    return await res.json();
  }

  const {data} = useQuery({
    queryKey:["fetchGuide"], 
    queryFn: getGuide
  })


const filteredGuide = () => {
  return Array.isArray(data?.data) ? data.data.filter((profile) => profile.user_name !== null && profile.user_rate !== null) : [];
};


  return (
    <>
      <div className="p-6 bg-white rounded-2xl shadow-md">
        <div className="grid grid-cols-3 gap-4">
          {filteredGuide().map((card, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-xl shadow-md flex items-center space-x-4"
            >
              <img
                src={`http://localhost:8080/${card.user_profile}`}
                alt={card.user_name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex justify-between w-full">
                <div>
                  <h4 className="font-medium text-lg">{card.user_name}</h4>
                  <p className="text-gray-500 text-sm">{card.user_email}</p>
                  <p className="text-gray-600 text-sm">
                    Hourly Rate: {card.user_rate}
                  </p>
                  <a href={`/${card.user_id}/profile`} className="text-blue-500 text-sm">
                    View Profile
                  </a>
                </div>
                <p className="text-yellow-500 text-sm">⭐ {card.user_rating ? card.user_rating : 0}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
