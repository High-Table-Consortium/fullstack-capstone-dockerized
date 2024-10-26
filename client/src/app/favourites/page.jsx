'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Trash2, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/authContent';
import { useFavourites } from '../../context/favourites';
import { useToast } from "../../hooks/use-toast";

export default function FavoritesPage() {
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isRemoving, setIsRemoving] = useState(false);
  const { user } = useAuth();
  const { fetchFavourites, favourites = [], removeFavourite } = useFavourites();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavourites();
    }
  }, [user, fetchFavourites]);

  useEffect(() => {
    let result = Array.isArray(favourites) ? [...favourites] : [];

    if (searchQuery) {
      result = result.filter(
        (fav) =>
          fav.attraction_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fav.attraction_location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      result = [...favourites]; // If no search query, show all favorites
    }

    setFilteredFavorites(result);
  }, [favourites, searchQuery]);

  const handleRemoveFavorite = async (favouriteId) => {
    try {
      console.log("Attempting to remove favourite with id:", favouriteId);
      if (!favouriteId) {
        throw new Error("Favourite ID is undefined or null");
      }

      setIsRemoving(true);
      await removeFavourite(favouriteId);
      toast({
        title: "Success",
        description: "Removed from favorites",
      });
      setFilteredFavorites((prev) => prev.filter((fav) => fav._id !== favouriteId));
    } catch (error) {
      toast({
        title: "Failure",
        description: `Failed to remove from favorites: ${error.message}`,
      });
      console.error("Error removing favorite:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log("Enter pressed, triggering search for:", searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Hello, {user ? user.firstName : 'Guest'}! Here are your saved attractions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full md:w-auto"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="flex items-center justify-center h-8 w-8 text-muted-foreground hover:text-destructive">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {filteredFavorites.length === 0 ? (
          <div className="text-center py-12">
            {searchQuery ? (
              <p className="text-lg text-muted-foreground mb-4">No favorites found matching your criteria.</p>
            ) : (
              <p className="text-lg text-muted-foreground mb-4">You have no favorites yet.</p>
            )}
            <Button asChild variant="outline">
              <Link href="/">Explore Destinations</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map(({ _id, attraction_id, attraction_name, attraction_image, attraction_location, attraction_description }) => (
              <Card key={_id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={attraction_image}
                    alt={attraction_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{attraction_name}</h3>
                  <p className="text-sm text-muted-foreground mb-2 flex items-center">
                    <MapPin className="mr-1 h-4 w-4" /> {attraction_location}
                  </p>
                  <p className="text-sm mb-2 line-clamp-2">{attraction_description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/destination/${attraction_id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleRemoveFavorite(_id)}
                    disabled={isRemoving}
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {isRemoving ? 'Removing...' : 'Remove'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
