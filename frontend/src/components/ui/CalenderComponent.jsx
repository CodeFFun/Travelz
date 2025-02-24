import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  addMonths,
  subMonths,
  setMonth,
  setYear,
} from 'date-fns';

// Sample events data - in a real app this would come from an API or database
const events = {
  '2024-03-02': [
    { id: 1, title: 'Meeting' },
    { id: 2, title: 'Party time' },
    { id: 3, title: 'Lunch' },
  ],
  '2024-03-16': [{ id: 4, title: 'Weekly call' }],
  '2024-03-21': [{ id: 5, title: 'Product Review' }],
  '2024-03-25': [{ id: 6, title: 'Christmas party' }],
};

function CalenderComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get all dates for the current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  // Generate array of dates to display
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  // Navigation handlers
  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return events[dateKey] || [];
  };

  // Month and Year selection handlers
  const handleMonthChange = (e) => {
    const newDate = setMonth(currentDate, parseInt(e.target.value));
    setCurrentDate(newDate);
  };

  const handleYearChange = (e) => {
    const newDate = setYear(currentDate, parseInt(e.target.value));
    setCurrentDate(newDate);
  };

  // Generate years array for the select (current year ± 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  // Months array for the select
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 min-w-screen flex flex-col items-center">
      <div className=" w-[70vw]">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Calendar Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-lg font-medium text-gray-900 min-w-[200px] text-center">
                {format(currentDate, 'MMMM d, yyyy')}
              </h2>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="flex gap-4">
              <select
                value={currentDate.getMonth()}
                onChange={handleMonthChange}
                className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </select>

              <select
                value={currentDate.getFullYear()}
                onChange={handleYearChange}
                className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {/* Week Days Header */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-900">
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map((day) => {
              const dayEvents = getEventsForDate(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const dateKey = format(day, 'yyyy-MM-dd');

              return (
                <div 
                  key={dateKey}
                  className={`bg-white p-2 min-h-[100px] ${
                    isCurrentMonth ? '' : 'bg-gray-50'
                  }`}
                >
                  <span className={`inline-block w-6 h-6 text-center leading-6 rounded-full ${
                    isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {format(day, 'd')}
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    {dayEvents.map((event) => (
                      <div 
                        key={event.id}
                        className="bg-purple-100 text-purple-700 text-xs p-1 rounded truncate cursor-pointer hover:bg-purple-200 transition-colors"
                        title={event.title}
                      >
                        {event.title}
                        hello
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalenderComponent;