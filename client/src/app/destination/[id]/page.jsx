'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Utensils, Heart, Info, Users, Calendar } from 'lucide-react';
import { getAttractionById, createReview, addComment, generateDayRoute, generateDestinationInfo } from '../../API/api';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import ReviewSection from "../../../components/ReviewSection";
import Navbar from '../../../components/Navbar';
import DestinationDetailSkeleton from "../../../components/DetailedPageSkeleton";
import Image from 'next/image';
import FooterComponent from '../../../components/Footer';
import { useAuth } from '../../../context/authContent';


import { useFavourites } from '../../../context/favourites';
import DestinationInfo from '@/components/destination/DestinationInfo';
import TripPlanner from '@/components/destination/TripPlanner';
import DayRoutineGenerator from '@/components/destination/DayRoutineGenerator';


export default function DestinationDetail({ params }) {
  const { id } = params;
  const { user } = useAuth();
  const [destination, setDestination] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [activeReviewId, setActiveReviewId] = useState(null);
  const [generatedRoute, setGeneratedRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const [showDayRoute, setShowDayRoute] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Add state for favorite icon
  const { addFavourite, isFavourite } = useFavourites()
  const [activeTab, setActiveTab] = useState('info');
  const isDataExpired = (timestamp) => {
    return (Date.now() - timestamp) > 2 * 60 * 60 * 1000; // 24 hours in milliseconds
  };


  const toggleFavorite = () => {
    addFavourite(id); // Pass the destination ID
    setIsFavorite(!isFavorite); // Toggle the favorite state
  };

  useEffect(() => {
    const fetchDestination = async () => {
      if (id) {
        try {
          const data = await getAttractionById(id);
          setDestination(data);

          const cachedInfo = JSON.parse(localStorage.getItem(`destinationInfo_${id}`));
          if (cachedInfo && !isDataExpired(cachedInfo.timestamp)) {
            setDestinationInfo(cachedInfo.data);
          } else {
            await handleGenerateDestinationInfo(data.name, data.location);
          }

          // Load cached day route if available and valid
          const cachedRoute = JSON.parse(localStorage.getItem(`dayRoute_${id}`));
          if (cachedRoute && !isDataExpired(cachedRoute.timestamp)) {
            setGeneratedRoute(cachedRoute.data);
          } else {
            await handleGenerateDayRoute(data); // Pass the fetched data to generate the day route
          }
        } catch (error) {
          console.error('Error fetching destination:', error);
        }
      }
    };

    fetchDestination();
  }, [id]);

  const handleGenerateDestinationInfo = async (name, location) => {
    try {
      setLoading(true);
      const generatedInfo = await generateDestinationInfo(name, location);
      const infoData = typeof generatedInfo === 'string' ? JSON.parse(generatedInfo) : generatedInfo.destination_info;
      setDestinationInfo(infoData);

      // Save to localStorage with a timestamp
      localStorage.setItem(`destinationInfo_${id}`, JSON.stringify({ data: infoData, timestamp: Date.now() }));
    } catch (error) {
      console.error('Error generating destination info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDayRoute = async () => {
    try {
      setLoading(true);
      const dayRouteData = {
        name: destination.name,
        location: destination.location,
        description: destination.description,
        category: destination.category,
        rating: destination.rating,
        hours: destination.hours,
        admission_price: destination.admission_price,
        image: destination.image,
        nearby_restaurants: destination.nearby_restaurants,
        other_activities: destination.other_activities,
      };

      const generatedRoute = await generateDayRoute(dayRouteData);
      setGeneratedRoute(generatedRoute);

      // Save to localStorage with a timestamp
      localStorage.setItem(`dayRoute_${id}`, JSON.stringify({ data: generatedRoute, timestamp: Date.now() }));
    } catch (error) {
      console.error('Error generating day route:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!destination) {
    return <DestinationDetailSkeleton />;
  }

  const handleAddReview = async (newReview) => {
    const handleAddReview = (newReview) => {
      setReviews(prevReviews => [newReview, ...prevReviews]);
      // You might also want to update the overall rating here
    };
  };

  const handleAddComment = async (reviewId) => {
    try {
      const addedComment = await addComment(reviewId, newComment);
      const updatedReviews = reviews.map((review) =>
        review._id === reviewId ? { ...review, comments: [...review.comments, addedComment] } : review
      );
      setReviews(updatedReviews);
      setNewComment('');
      setActiveReviewId(null);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-gray-50"
      >
        {/* <div className="relative h-[50vh] md:h-[70vh] w-full ">
          <Image
            src={destination.image}
            alt={destination.name}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
            <h1 className="text-3xl md:text-6xl font-serif mb-2 md:mb-4">{destination.name}</h1>
            <p className="text-lg md:text-2xl mb-2">{destination.description}</p> */}

        {/* Weather Section
            {weatherData ? (
              <div className="mt-4 bg-white bg-opacity-70 p-4 rounded-lg shadow-md text-black">
                <h3 className="text-lg font-semibold">Current Weather in {destination.location}</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                    className="w-12 h-12"
                  />
                  <div>
                    <p className="text-lg font-medium">
                      {weatherData.main.temp}°C - {weatherData.weather[0].description}
                    </p>
                    <p className="text-sm">
                      Humidity: {weatherData.main.humidity}% | Wind: {weatherData.wind.speed} m/s
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm">Weather information not available</p>
            )} */}
        {/* </div> */}

        {/* Favorite Icon
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition"
            aria-label="Add to favorites"
            disabled={isFavourite(id)}
          >
            <Heart
              className={`w-6 h-6 ${isFavorite ? 'text-red-600' : 'text-gray-600'}`}
              fill={isFavourite ? 'currentColor' : 'none'} // Change fill based on isFavorite state
            />
          </button>
        </div> */}

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
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition"
            aria-label="Add to favorites"
            disabled={isFavourite(id)}
          >
            <Heart
              className={`w-6 h-6 ${isFavorite ? 'text-red-600' : 'text-gray-600'}`}
              fill={isFavourite ? 'currentColor' : 'none'} // Change fill based on isFavorite state
            />
          </button>
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
                  className={`flex items-center px-4 py-4 border-b-2 font-medium ${activeTab === id
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
          {/* <DestinationInfo destination={destination} destinationInfo={destinationInfo} /> */}
          {activeTab === 'info' && <DestinationInfo destination={destination} destinationInfo={destinationInfo} />}
          {activeTab === 'planner' && <TripPlanner destination={destination} />}
          {activeTab === 'routine' && <DayRoutineGenerator destination={destination} />}


          {/* Main Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6 md:mt-10 mx-auto py-6 px-4 md:px-8 w-full">

            {/* Generated Destination Info Section */}


            {/* Details Section */}



          </div>
        </div>



        <div className="mx-auto py-6 px-4 md:px-8">
          <h2 className="text-2xl font-semibold mb-4">Nearby Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destination.nearby_restaurants.map((restaurant) => (
              <Card key={restaurant._id}>
                <CardContent className="p-0">
                  <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover rounded-t-lg" />
                </CardContent>
                <CardContent className="space-y-2 p-4">
                  <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                  <p className="text-gray-600">{restaurant.type}</p>
                  <div className="flex items-center">
                    <Utensils className="mr-2 text-primary" />
                    <span>{restaurant.distance_from_attraction}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 text-primary" />
                    <span>{restaurant.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-2 text-yellow-400" />
                    <span>{restaurant.rating} / 5</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="mx-auto py-6 px-4 md:px-8 w-full">
          {/* Reviews Section */}
          <ReviewSection
            reviews={reviews}
            attraction_id={id}
            attractionName={destination.name}
            onAddReview={handleAddReview}
            address={destination.location}
          />
        </div>

        <FooterComponent />
      </motion.div>
    </div>
  );
}

