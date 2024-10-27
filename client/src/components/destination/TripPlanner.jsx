"use client"
import React, { useState } from 'react';
import { Calendar, Users, Plus, Trash2 } from 'lucide-react';

const TripPlanner = ({ destination }) => {
  const [tripDetails, setTripDetails] = useState({
    startDate: '',
    endDate: '',
    travelers: 1,
    activities: []
  });

  const [newActivity, setNewActivity] = useState('');

  const addActivity = () => {
    if (newActivity.trim()) {
      setTripDetails(prev => ({
        ...prev,
        activities: [...prev.activities, { id: Date.now(), name: newActivity.trim() }]
      }));
      setNewActivity('');
    }
  };

  const removeActivity = (id) => {
    setTripDetails(prev => ({
      ...prev,
      activities: prev.activities.filter(activity => activity.id !== id)
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Plan Your Trip</h2>
          
          {/* Trip Details Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={tripDetails.startDate}
                    onChange={(e) => setTripDetails(prev => ({ ...prev, startDate: e.target.value }))}
                    className="pl-10 w-full p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={tripDetails.endDate}
                    onChange={(e) => setTripDetails(prev => ({ ...prev, endDate: e.target.value }))}
                    className="pl-10 w-full p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Travelers
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  value={tripDetails.travelers}
                  onChange={(e) => setTripDetails(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                  className="pl-10 w-full p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Activities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Planned Activities
              </label>
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  placeholder="Add an activity..."
                  className="flex-1 p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  onClick={addActivity}
                  className="bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              <ul className="space-y-2">
                {tripDetails.activities.map(activity => (
                  <li
                    key={activity.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span>{activity.name}</span>
                    <button
                      onClick={() => removeActivity(activity.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors">
              Save Trip Plan
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4">Trip Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium">
                {tripDetails.startDate && tripDetails.endDate
                  ? `${Math.ceil((new Date(tripDetails.endDate) - new Date(tripDetails.startDate)) / (1000 * 60 * 60 * 24))} days`
                  : '-'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Travelers</span>
              <span className="font-medium">{tripDetails.travelers}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Activities</span>
              <span className="font-medium">{tripDetails.activities.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;