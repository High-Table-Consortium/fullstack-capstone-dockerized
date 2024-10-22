'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/authContent';
import { useFavourites } from '../../context/favourites';

export default function FavoritesPage() {
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [sortOption, setSortOption] = useState('name');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const { user } = useAuth();
  const { fetchFavourites, favourites, removeFavourite } = useFavourites();

  // Track whether the component has mounted on the client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Mark as mounted on client-side
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavourites(); // Fetch favourites if user is available
    }
  }, [user]);

  // Filtering and sorting logic
  useEffect(() => {
    let result = [...favourites]; // Use the fetched favourites

    if (filterCategory !== 'All') {
      result = result.filter((fav) => fav.category === filterCategory);
    }

    if (searchQuery) {
      result = result.filter(
        (fav) =>
          fav.attraction_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fav.attraction_location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortOption === 'name') return a.attraction_name.localeCompare(b.attraction_name);
      if (sortOption === 'rating') return b.attraction_rating - a.attraction_rating;
      return 0;
    });

    setFilteredFavorites(result);
  }, [favourites, filterCategory, searchQuery, sortOption]);

  if (!mounted) {
    // Return nothing or a loading state during server-side rendering
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Hello, {user ? user.firstName : 'unknown'}! Here are your saved attractions.
          </p>
        </div>

        {/* Filtering and sorting UI */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-[180px] border border-gray-300 rounded-md p-2"
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </select>

            {/* Filtering Option */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-[180px] border border-gray-300 rounded-md p-2"
            >
              <option value="All">All Categories</option>
              <option value="Historical">Historical</option>
              <option value="Nature">Nature</option>
              <option value="Adventure">Adventure</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-auto"
            />
          </div>
        </div>

        {/* Grid or Map view */}
        {filteredFavorites.length === 0 ? (
          <p className="text-center text-gray-500">No favorites found matching your criteria.</p>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map(({ attraction_id, attraction_name, attraction_image, attraction_location, attraction_description }) => (
              <Card key={attraction_id} className="overflow-hidden">
                <Image
                  src={attraction_image}
                  alt={attraction_name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{attraction_name}</h3>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center">
                    <MapPin className="mr-1 h-4 w-4" /> {attraction_location}
                  </p>
                  <p className="text-sm mb-2">{attraction_description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/destination/${attraction_id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => removeFavourite(attraction_id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-muted h-[400px] flex items-center justify-center rounded-lg">
            <p className="text-muted-foreground">Map view would be implemented here</p>
          </div>
        )}
      </div>
    </div>
  );
}
