'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AddFavourites, getFavourites, removeFavourites } from '../app/API/api';
import { useAuth } from "../context/authContent";

const FavouritesContext = createContext();

// FavouritesProvider component
export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchFavourites();
  }, [user]);

  const fetchFavourites = async () => {
    setLoading(true);
    try {
      // Fetch favourites only if the user has any associated
      const fetchedFavourites = user?.favourites || [];
      if (fetchedFavourites.length) {
        setFavourites(fetchedFavourites);
      } else {
        console.warn("No favourites found for the user.");
      }
    } catch (error) {
      console.error('Error fetching favourites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavourite = async (favouriteId) => {
    if (!user?.id) {
      console.warn('User is not authenticated.');
      return;
    }
    // Avoid duplicating favorite items
    if (isFavourite(favouriteId)) {
      console.warn('Item is already in favourites.');
      return;
    }
    try {
      const updatedFavourites = await AddFavourites(user.id, favouriteId);
      setFavourites(updatedFavourites);
    } catch (error) {
      console.error('Error adding favourite:', error);
    }
  };

  const removeFavourite = async (favouriteId) => {
    if (!user?.id) {
      console.warn('User is not authenticated.');
      return;
    }
    try {
      await removeFavourites(user.id, favouriteId);

      // Filter out the removed favourite locally and update the state
      setFavourites(prev => prev.filter(favourite => favourite.id !== favouriteId));
    } catch (error) {
      console.error('Error removing favourite:', error);
    }
  };

  const isFavourite = (favouriteId) => {
    return Array.isArray(favourites) && favourites.some(favourite => favourite.id === favouriteId);
  };

  return (
    <FavouritesContext.Provider
      value={{ fetchFavourites, favourites, addFavourite, removeFavourite, isFavourite, loading }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

// Custom hook for consuming the context
export const useFavourites = () => useContext(FavouritesContext);

export default FavouritesContext;
