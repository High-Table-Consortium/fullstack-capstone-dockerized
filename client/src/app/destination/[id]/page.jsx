'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Utensils, Heart  } from 'lucide-react';
import { getAttractionById, createReview, addComment, generateDayRoute, generateDestinationInfo } from '../../api/api';
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import ReviewSection from "../../../components/ReviewSection";
import Navbar from '../../../components/Navbar';
import DestinationDetailSkeleton from "../../../components/DetailedPageSkeleton";
import Image from 'next/image';
import FooterComponent from '../../../components/Footer';

export default function DestinationDetail({ params }) {
  const { id } = params;
  const [destination, setDestination] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [activeReviewId, setActiveReviewId] = useState(null);
  const [generatedRoute, setGeneratedRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const [showDayRoute, setShowDayRoute] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Add state for favorite icon
  const isDataExpired = (timestamp) => {
    return (Date.now() - timestamp) > 2 * 60 * 60 * 1000; // 24 hours in milliseconds
  };


  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // You can also add code to save the favorite status to localStorage or a backend here
  };

  useEffect(() => {
    const fetchDestination = async () => {
      if (id) {
        try {
          const data = await getAttractionById(id);
          setDestination(data);

          // Load cached destination info if available and valid
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

  const handleAddReview = async (review) => {
    try {
      const userId = user.id; // Ensure you have access to the user object
      const addedReview = await createReview(userId, review.comment, id);
      setReviews((prevReviews) => [...prevReviews, addedReview]);
      console.log('Review added successfully');
    } catch (error) {
      console.error('Error adding review:', error);
    }
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
        className="w-full"
      >
        {/* Header Section */}
        <div className="relative h-[50vh] md:h-[70vh] w-full">
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
            <p className="text-lg md:text-2xl mb-2">{destination.description}</p>
          </div>

          {/* Favorite Icon */}
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition"
            aria-label="Add to favorites"
          >
            <Heart
              className={`w-6 h-6 ${isFavorite ? 'text-red-600' : 'text-gray-600'}`}
              fill={isFavorite ? 'currentColor' : 'none'} // Change fill based on isFavorite state
            />
          </button>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6 md:mt-10 mx-auto py-6 px-4 md:px-8 w-full">

          {/* Generated Destination Info Section */}
          {destinationInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg p-6 rounded-lg border border-gray-200 w-full">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Destination Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-bold">Description</h3>
                  <p className="text-gray-700">{destinationInfo.description || 'Description not available'}</p>

                  <h3 className="text-lg font-bold">Why Visit {destination.name}</h3>
                  <ul className="list-disc list-inside mb-4">
                    {destinationInfo.why_visit?.map((reason, index) => (
                      <li key={index} className="text-gray-700">{reason}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-bold">Top Activities</h3>
                  <ul className="list-disc list-inside mb-4">
                    {destinationInfo.top_activities?.map((activity, index) => (
                      <li key={index} className="text-gray-700">
                        {activity.activity} - <span className="font-semibold">{activity.duration}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-bold">Nearby Attractions</h3>
                  <ul className="list-disc list-inside mb-4">
                    {destinationInfo.nearby_attractions?.map((attraction, index) => (
                      <li key={index} className="text-gray-700">{attraction}</li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-bold">Tips</h3>
                  <ul className="list-disc list-inside mb-4">
                    {destinationInfo.tips?.map((tip, index) => (
                      <li key={index} className="text-gray-700">{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Details Section */}
          <Card className="shadow-lg p-6 rounded-lg border border-gray-200 w-full">
            <CardContent className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Details</h2>
              <div className="flex items-center space-x-2">
                <MapPin className="text-primary" />
                <span className="text-lg">Location - {destination.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-400" />
                <span className="text-lg">Rating - {destination.rating} / 5</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-primary" />
                <span className="text-lg">Hours- {destination.hours}</span>
              </div>

              {/* Button to Show/Hide Day Route */}
              <Button onClick={() => {
                setShowDayRoute(!showDayRoute);
                if (!showDayRoute) handleGenerateDayRoute(); // Only generate if showing
              }}>
                {showDayRoute ? 'Hide Day Route' : 'Generate Day Route'}
              </Button>

              {/* Generated Route Display */}
              {showDayRoute && (
                loading ? (
                  <p>Loading route...</p>
                ) : (
                  generatedRoute && generatedRoute.routine && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4" // Add margin for spacing
                    >
                      <h3 className="text-lg font-bold">Suggested Day Route</h3>
                      {Object.keys(generatedRoute.routine).map((day, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="text-xl font-bold mb-2">{day}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            {Array.isArray(generatedRoute.routine[day]) ? (
                              generatedRoute.routine[day].map((activity, idx) => (
                                <div key={idx} className="border rounded-lg p-4 shadow-md">
                                  <span className="font-semibold">{activity.time}:</span>
                                  <span> {activity.activity}</span>
                                </div>
                              ))
                            ) : (
                              <div className="border rounded-lg p-4 shadow-md">
                                <span>{generatedRoute.routine[day]}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )
                )
              )}
            </CardContent>
          </Card>


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
