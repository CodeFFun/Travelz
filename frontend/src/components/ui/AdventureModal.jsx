/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import {useState} from 'react';
import { X, Upload } from 'lucide-react';



export default function AdventureModal({ isOpen, onClose, onSave, adventure }) {

    const [image, setImage] = useState("")
  const [formData, setFormData] = useState({
    diary_title: adventure?.diary_title || '',
    diary_date: adventure?.diary_date || '',
    diary_desc: adventure?.diary_desc || '',
    diary_location: adventure?.diary_location || '',
    diary_image: adventure?.diary_image || '',
  });

  // Convert date string to YYYY-MM-DD format for date input
  const formatDateForInput = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0];
    } catch {
        return ''
    }
    }

  // Format date from YYYY-MM-DD to readable format
  const formatDateForDisplay = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  useEffect(() => {
    if (adventure) {
      setFormData(adventure);
    } else {
      setFormData({
        diary_date: '',
        diary_title: '',
        diary_desc: '',
        diary_location: '',
        diary_image: '',
      });
    }
  }, [adventure]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      date: formatDateForDisplay(formData.date)
    });
    onClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        diary_image: file, // Store the actual file
        // diary_image: URL.createObjectURL(file), // Local preview
      });
      setImage(URL.createObjectURL(file))
    }
  };
  
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {adventure ? 'Edit Adventure' : 'Add New Adventure'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.diary_title}
              onChange={(e) => setFormData({ ...formData, diary_title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={formatDateForInput(formData.diary_date)}
              onChange={(e) => setFormData({ ...formData, diary_date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.diary_desc}
              onChange={(e) => setFormData({ ...formData, diary_desc: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.diary_location}
              onChange={(e) => setFormData({ ...formData, diary_location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <div className="mt-1 flex items-center gap-4">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Choose Image
                </button>
              </div>
              {formData.diary_image && (
                <div className="flex-1">
                  <img
                    src={image}
                    alt="Preview"
                    className="h-20 w-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Supported formats: JPG, PNG, GIF
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              {adventure ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
