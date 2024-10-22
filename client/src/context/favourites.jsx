'use client';
import { AddFavourites, getFavourites } from '../app/API/api';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from "../context/authContent";

const FavouritesContext = createContext();

// FavouritesProvider component
export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchFavourites = async () => {
    setLoading(true);
    try {
      // Ensure that the user has favourites before trying to fetch them
      if (user.favourites) {
        const fetchedFavourites = user.favourites;
  
        // Log fetched favourites directly for debugging
        console.log("Fetched favourites from user:", fetchedFavourites);
  
        // Set the favourites state
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

  

  const addFavourite = async (attraction_id) => {
    if (user && user.id) {
      // Check if the attraction is already in favourites
      if (isFavourite(attraction_id)) {
        console.warn('Attraction is already in favourites.');
        return;
      }
      try {
        const updatedFavourites = await AddFavourites(user.id, attraction_id);
        setFavourites(updatedFavourites);
      } catch (error) {
        console.error('Error adding favourite:', error);
      }
    }
  };

  const removeFavourite = (attractionId) => {
    const updatedFavourites = favourites.filter((attraction) => attraction.id !== attractionId);
    setFavourites(updatedFavourites);
    // Optionally, call an API endpoint to remove it from the backend
  };

  const isFavourite = (attractionId) => {
    return Array.isArray(favourites) && favourites.some((attraction) => attraction.id === attractionId);
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
