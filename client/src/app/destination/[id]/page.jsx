'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock, Utensils, DollarSign } from 'lucide-react'
import { getAttractionById, createReview, getReviews, addComment, generateDayRoute } from '../../API/api'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import ReviewSection from "../../../components/ReviewSection"
import Navbar from '../../../components/Navbar'
import DestinationDetailSkeleton from "../../../components/DetailedPageSkeleton"

export default function DestinationDetail({ params }) {
  const { id } = params;
  const [destination, setDestination] = useState(null);
  const [showDayRoute, setShowDayRoute] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [activeReviewId, setActiveReviewId] = useState(null);
  const [generatedRoute, setGeneratedRoute] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for route generation

  useEffect(() => {
    if (id) {
      const fetchDestination = async () => {
        try {
          const data = await getAttractionById(id);
          setDestination(data);

          const reviewsData = await getReviews(id);
          setReviews(reviewsData);
        } catch (error) {
          console.error('Error fetching destination:', error);
        }
      };
      fetchDestination();
    }
  }, [id]);

  if (!destination) {
    return <DestinationDetailSkeleton />;
  }

  const handleAddReview = async (review) => {
    try {
      const addedReview = await createReview(id, review);
      setReviews((prevReviews) => [...prevReviews, addedReview]);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleAddComment = async (reviewId) => {
    try {
      const addedComment = await addComment(reviewId, newComment);
      const updatedReviews = reviews.map((review) =>
        review._id === reviewId
          ? { ...review, comments: [...review.comments, addedComment] }
          : review
      );
      setReviews(updatedReviews);
      setNewComment('');
      setActiveReviewId(null);
    } catch (error) {
      console.error('Error adding comment:', error);
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
      setGeneratedRoute(generatedRoute); // Update state with the generated route
    } catch (error) {
      console.error('Error generating day route:', error);
    } finally {
      setLoading(false); // End loading
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
        className="container mx-auto py-8 px-4 space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{destination.name}</h1>
          <p className="text-gray-600">{destination.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-0">
              <img src={destination.image} alt={destination.name} className="w-full h-64 object-cover rounded-t-lg" />
            </CardContent>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center">
                <MapPin className="mr-2 text-primary" />
                <span>{destination.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-2 text-yellow-400" />
                <span>{destination.rating} / 5</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 text-primary" />
                <span>{destination.hours}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Other Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {destination.other_activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Button onClick={() => {
            setShowDayRoute(!showDayRoute);
            if (!showDayRoute) handleGenerateDayRoute();
          }}>
            {showDayRoute ? 'Hide Day Route' : 'Generate Day Route'}
          </Button>

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
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Suggested Day Route</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {Object.keys(generatedRoute.routine).map((day, index) => (
                        <div key={index} className="mb-4">
                          <h3 className="text-xl font-bold mb-2">{day}</h3>
                          <ul className="space-y-2">
                            {Array.isArray(generatedRoute.routine[day]) ? (
                              generatedRoute.routine[day].map((activity, idx) => (
                                <li key={idx} className="flex items-center space-x-2">
                                  <span className="font-semibold">{activity.time}:</span>
                                  <span>{activity.activity}</span>
                                </li>
                              ))
                            ) : (
                              <li>
                                <span>{generatedRoute.routine[day]}</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )
          )}



        </div>

        <div>
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

        <ReviewSection reviews={reviews} attractionId={id} attractionName={destination.name} onAddReview={handleAddReview} address={destination.location} />
      </motion.div>
    </div>
  );
}
