import React, { useState, useEffect } from 'react'
import { Star, ThumbsUp } from 'lucide-react'
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { createReview, getReviews } from '../app/API/api'

// StarRating Component
function StarRating({ rating, onRatingChange }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-6 h-6 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} ${onRatingChange ? 'cursor-pointer' : ''}`}
          onClick={() => onRatingChange && onRatingChange(i + 1)}
        />
      ))}
    </div>
  )
}

// ReviewCard Component
function ReviewCard({ review }) {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-start space-x-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={review.author.avatar} alt={review.author.name} />
          <AvatarFallback>{review.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{review.author.name}</h3>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <StarRating rating={review.rating} />
          <p className="mt-2 text-sm text-gray-700">{review.content}</p>
          <div className="mt-2 flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span className="text-xs">{review.likes}</span>
            </Button>
          </div>
          {review.ownerResponse && (
            <div className="mt-3 bg-gray-50 p-3 rounded-md">
              <p className="text-sm font-semibold">Response from the owner</p>
              <p className="text-sm text-gray-700 mt-1">{review.ownerResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// AddReviewModal Component
function AddReviewModal({ onAddReview }) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newReview = await createReview(/* Pass necessary parameters here */)
      onAddReview(newReview)
      setRating(0)
      setReview('')
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Write a review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with Charley Grey. Your feedback helps others make informed decisions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="review">Your Review</Label>
            <Textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
            />
          </div>
          <Button type="submit">Submit Review</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Main ReviewSection Component
export default function ReviewSection({ attractionId, attractionName, address }) {
  const [reviews, setReviews] = useState([])

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  }
  const overallRating = calculateAverageRating()
  const totalReviews = reviews.length

  const handleAddReview = (newReview) => {
    setReviews(prevReviews => [newReview, ...prevReviews])
  }

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews(attractionId)
        setReviews(data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }
    fetchReviews()
  }, [attractionId])

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Reviews for {attractionName}</h2>
            <p className="text-sm text-gray-500">{address}</p>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold mr-2">{overallRating}</span>
              <StarRating rating={Math.round(overallRating)} />
              <span className="ml-2 text-sm text-gray-500">{totalReviews} reviews</span>
            </div>
          </div>
          <AddReviewModal onAddReview={handleAddReview} />
        </div>
        <div className="space-y-4">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}
