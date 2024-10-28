import React, { useState } from 'react';
import { Clock, Sun, Moon, Coffee, Utensils } from 'lucide-react';

const timeSlots = [
  { id: 'morning', label: 'Morning', icon: Sun, time: '06:00 - 12:00' },
  { id: 'afternoon', label: 'Afternoon', icon: Coffee, time: '12:00 - 17:00' },
  { id: 'evening', label: 'Evening', icon: Moon, time: '17:00 - 22:00' }
];

const defaultRoutines = {
  morning: [
    "Cable car ride to the summit",
    "Explore the viewing platforms",
    "Short hiking trail on top"
  ],
  afternoon: [
    "Lunch at Table Mountain Café",
    "Visit the Souvenir Shop",
    "Photography session"
  ],
  evening: [
    "Sunset viewing",
    "Cable car descent",
    "Dinner at nearby restaurant"
  ]
};

const DayRoutineGenerator = ({ destination }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('morning');
  const [routines, setRoutines] = useState(defaultRoutines);
  const [customActivity, setCustomActivity] = useState('');

  const addCustomActivity = () => {
    if (customActivity.trim()) {
      setRoutines(prev => ({
        ...prev,
        [selectedTimeSlot]: [...prev[selectedTimeSlot], customActivity.trim()]
      }));
      setCustomActivity('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Day Routine Generator</h2>

          {/* Time Slot Selector */}
          <div className="flex space-x-4 mb-8">
            {timeSlots.map(({ id, label, icon: Icon, time }) => (
              <button
                key={id}
                onClick={() => setSelectedTimeSlot(id)}
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                  selectedTimeSlot === id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-200'
                }`}
              >
                <Icon className={`h-6 w-6 mx-auto mb-2 ${
                  selectedTimeSlot === id ? 'text-emerald-500' : 'text-gray-400'
                }`} />
                <div className="text-sm font-medium">{label}</div>
                <div className="text-xs text-gray-500">{time}</div>
              </button>
            ))}
          </div>

          {/* Activities List */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Suggested Activities for {timeSlots.find(t => t.id === selectedTimeSlot)?.label}
              </h3>
              <ul className="space-y-3">
                {routines[selectedTimeSlot].map((activity, index) => (
                  <li
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <Clock className="h-5 w-5 text-emerald-500 mr-3" />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Activity Input */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Add Custom Activity</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customActivity}
                  onChange={(e) => setCustomActivity(e.target.value)}
                  placeholder="Enter your activity..."
                  className="flex-1 p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  onClick={addCustomActivity}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Daily Overview</h3>
          <div className="space-y-6">
            {timeSlots.map(({ id, label, icon: Icon }) => (
              <div key={id}>
                <div className="flex items-center mb-2">
                  <Icon className="h-5 w-5 text-emerald-500 mr-2" />
                  <h4 className="font-medium">{label}</h4>
                </div>
                <ul className="pl-7 space-y-1">
                  {routines[id].map((activity, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayRoutineGenerator;