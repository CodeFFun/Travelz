/* eslint-disable react/prop-types */
import { MapPin, X } from 'lucide-react';

export default function AdventureCard({ 
  diary_title, 
  diary_date, 
  diary_desc, 
  diary_location, 
  diary_image,
  onEdit,
  onDelete
}) {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] relative"
      onClick={onEdit}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>

      <div className="relative">
        <img
          src={`http://localhost:8080/${diary_image}`}
          alt={diary_title}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {diary_title}
        </h2>
        <p className="text-sm text-gray-500 mb-4">{diary_date}</p>
        
        <p className="text-gray-600 mb-4">
          {diary_desc}
        </p>

        <div className="flex items-center text-teal-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{diary_location}</span>
        </div>
      </div>
    </div>
);
}
