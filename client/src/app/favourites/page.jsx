'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Heart, Calendar, Search, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter } from '../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { toast } from '../../hooks/use-toast';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [sortOption, setSortOption] = useState('name');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Fetch data from an API endpoint (or database)
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites'); //API route
        const data = await response.json();
        setFavorites(data);
        setFilteredFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  // Filtering and sorting
  useEffect(() => {
    let result = [...favorites];

    if (filterCategory !== 'All') {
      result = result.filter((fav) => fav.category === filterCategory);
    }

    if (searchQuery) {
      result = result.filter(
        (fav) =>
          fav.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fav.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0;
    });

    setFilteredFavorites(result);
  }, [favorites, filterCategory, searchQuery, sortOption]);

  const removeFavorite = (id) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
    toast({
      title: 'Removed from favorites',
      description: 'The attraction has been removed from your favorites list.',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
      <p className="text-xl text-muted-foreground mb-6">
        Hello, Ntokozo! Here are your saved attractions.
      </p>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Select onValueChange={setSortOption} defaultValue={sortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setFilterCategory} defaultValue={filterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Historical">Historical</SelectItem>
              <SelectItem value="Nature">Nature</SelectItem>
              <SelectItem value="Adventure">Adventure</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search favorites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-auto"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" /> View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setViewMode('grid')}>Grid View</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setViewMode('map')}>Map View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {filteredFavorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorites found matching your criteria.</p>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((favorite) => (
            <Card key={favorite.id} className="overflow-hidden">
              <Image
                src={favorite.image}
                alt={favorite.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">{favorite.name}</h3>
                <p className="text-sm text-muted-foreground mb-2 flex items-center">
                  <MapPin className="mr-1 h-4 w-4" /> {favorite.location}
                </p>
                <p className="text-sm mb-2">{favorite.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Rating: {favorite.rating}/5</span>
                  <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                    {favorite.category}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/attraction/${favorite.id}`}>
                    View Details
                  </Link>
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => removeFavorite(favorite.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                  </Button>
                  <Button variant="outline" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-muted h-[400px] flex items-center justify-center rounded-lg">
          <p className="text-muted-foreground">Map view would be implemented here</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Discover More Attractions</h2>
        <Button asChild>
          <Link href="/attractions">Explore All Attractions</Link>
        </Button>
      </div>
    </div>
  );
}
