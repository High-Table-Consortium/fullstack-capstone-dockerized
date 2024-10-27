import React from 'react';
import { MapPin, Star, Utensils } from 'lucide-react';

const NearbyRestaurants = ({ restaurants }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Nearby Restaurants</h2>
      <div className="space-y-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className="flex space-x-4">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium">{restaurant.name}</h3>
              <div className="text-sm text-gray-500 mt-1">
                <Utensils className="inline h-4 w-4 mr-1" />
                <span>{restaurant.type}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="inline h-4 w-4 mr-1" />
                <span>{restaurant.distance_from_attraction}</span>
              </div>
              <div className="flex items-center mt-1">
                <Star className="inline h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm ml-1">{restaurant.rating} / 5</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyRestaurants;
