import { Plus } from 'lucide-react';
import AdventureCard from './AdventureCard';
import AdventureModal from './AdventureModal';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';


function DiaryComponent() {
  const [adventures, setAdventures] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdventure, setSelectedAdventure] = useState();

  const getDiary = async () => {
    const res = await fetch("http://localhost:8080/diary", {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  };

  const { data } = useQuery({
    queryKey: ["fetchDiary"],
    queryFn: getDiary,
  });

  useEffect(() => {
    if (data?.data) {
      setAdventures(data.data); // Update state with the fetched data
    }
  }, [data]);

  const handleAddClick = () => {
    setSelectedAdventure(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (adventure) => {
    setSelectedAdventure(adventure);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (adventureToDelete) => {
    if (confirm('Are you sure you want to delete this adventure?')) {
      console.log(adventureToDelete)
      const res = await fetch(`http://localhost:8080/diary/${adventureToDelete.diary_id}`, {
        method: "DELETE",
        credentials: "include",
      });
      console.log(await res.json());
      
    }
  };

  const handleSave = async (adventure) => {
    if (selectedAdventure) {
      // Update existing adventure
      setAdventures(adventures.map(adv => 
        adv === selectedAdventure ? adventure : adv
      ));
      console.log(adventure)
      const formData = new FormData();
      formData.append('diary_title', adventure.diary_title);
      formData.append('diary_date', adventure.diary_date);
      formData.append('diary_desc', adventure.diary_desc);
      formData.append('diary_location', adventure.diary_location);
      formData.append('diary_image', adventure.diary_image);
      const res = await fetch(`http://localhost:8080/diary/${adventure.diary_id}`, {
        method: 'PATCH',
        credentials:'include',
        body: formData
    });
    const data = await res.json();
    console.log(data, adventure)
    } else {
      // Add new adventure
      setAdventures([...adventures, adventure]);
      const formData = new FormData();
      formData.append('diary_title', adventure.diary_title);
      formData.append('diary_date', adventure.diary_date);
      formData.append('diary_desc', adventure.diary_desc);
      formData.append('diary_location', adventure.diary_location);
      formData.append('diary_image', adventure.diary_image);
        const res = await fetch('http://localhost:8080/diary', {
            method: 'POST',
            credentials:'include',
            body: formData
        });
        const data = await res.json();
        console.log(data, adventure)
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Adventures</h1>
          <button 
            onClick={handleAddClick}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Adventure</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 py-3 lg:grid-cols-4 gap-6">
          {adventures.map((adventure, index) => (
            <AdventureCard
              key={index}
              {...adventure}
              onEdit={() => handleEditClick(adventure)}
              onDelete={() => handleDeleteClick(adventure)}
            />
          ))}
        </div>
      </div>

      <AdventureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        adventure={selectedAdventure}
      />
    </div>
  );
}

export default DiaryComponent;