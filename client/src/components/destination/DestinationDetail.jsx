"use client"
import React, { useState } from 'react';
import { MapPin, Star, Clock, Info, Calendar, Users } from 'lucide-react';
import DestinationInfo from './DestinationInfo';
import TripPlanner from './TripPlanner';
import DayRoutineGenerator from './DayRoutineGenerator';
import NearbyAttractions from './NearbyAttractions';

const destination = {
  id: 1,
  name: "Table Mountain",
  location: "Cape Town",
  rating: 4.8,
  reviews: 3240,
  description: "Table Mountain is a flat-topped mountain forming a prominent landmark overlooking the city of Cape Town. The main feature of Table Mountain is the level plateau approximately 3 kilometers from side to side, surrounded by steep cliffs.",
  image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
  tips: [
    "Visit early morning to avoid crowds",
    "Book cable car tickets online in advance",
    "Check weather conditions before visiting",
    "Bring warm clothing as it can get cold at the top",
    "Carry water and snacks"
  ],
  bestTimeToVisit: "October to March",
  averageVisitDuration: "4-6 hours",
  entranceFee: "R380 for return cable car",
  coordinates: {
    lat: -33.9628,
    lng: 18.4037
  }
};

const DestinationDetail = () => {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-[400px]">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{destination.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                <span>{destination.rating}</span>
                <span className="ml-1">({destination.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'info', label: 'Information', icon: Info },
              { id: 'planner', label: 'Trip Planner', icon: Calendar },
              { id: 'routine', label: 'Day Routine', icon: Clock }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-4 py-4 border-b-2 font-medium ${
                  activeTab === id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'info' && <DestinationInfo destination={destination} />}
        {activeTab === 'planner' && <TripPlanner destination={destination} />}
        {activeTab === 'routine' && <DayRoutineGenerator destination={destination} />}
      </div>
    </div>
  );
};

export default DestinationDetail;