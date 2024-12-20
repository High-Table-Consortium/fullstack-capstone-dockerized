import React, { useState, useEffect } from 'react'
import { Star, ThumbsUp } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { addComment, createReview, getReviewsByDestination } from '../app/API/api'
import { useAuth } from '../context/authContent'

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

function CommentSection({ comments, onAddComment, currentUser }) {
  const [newComment, setNewComment] = useState('');
  // const { user } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Comments</h4>
      {comments.map((comment, index) => (
        <div key={index} className="flex items-start space-x-2 mb-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={comment.user?.avatar} alt={comment.user?.name} />
            <AvatarFallback>{comment.user?.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{comment.user?.name}</p>
            <p className="text-sm">{comment.text}</p>
          </div>
        </div>
      ))}
      {/* {currentUser && ( */}
        <form onSubmit={handleSubmit} className="mt-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="mb-2"
          />
          <Button type="submit" size="sm">Add Comment</Button>
        </form>
      {/* )} */}
    </div>
  );
}

// ReviewCard Component
function ReviewCard({ review, onAddComment, currentUser }) {
  const [showComments, setShowComments] = useState(false);
  const authorName = review.user_id?.firstName || 'Anonymous User'; // Access first name directly
  const avatarSrc = review.user?.avatar || ''; // Assuming you have avatar info in user object
  const rating = review.rating || 0; // Default to 0 if rating is not provided

  // Format the date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';

    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-start space-x-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={avatarSrc} alt={authorName} />
          <AvatarFallback>{authorName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{authorName}</h3>
            <span className="text-sm text-gray-500">{formatDate(review.createdAt) || 'Date not available'}</span>
          </div>
          <StarRating rating={rating} />
          <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
          <div className="mt-2 flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span className="text-xs">{review.likes || 0}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowComments(!showComments)}
            >
              {showComments ? `Hide Comments` : `Show Comments`}
            </Button>
          </div>
          {showComments && (
            <CommentSection
              comments={review.comments || []}
              onAddComment={(commentText) => onAddComment(review._id, commentText)}
              // currentUser={currentUser}
            />
          )}
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
function AddReviewModal({ onAddReview, attraction_id }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('');
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error('User is not authenticated.');
      // Show a user-friendly message here
      return;
    }

    if (!rating) {
      console.warn('Rating is required.');
      // Show a user-friendly message here
      return;
    }

    // const reviewData = {
    //   user_id: user.id,
    //   attraction_id,
    //   comment,
    //   rating
    // };

    // console.log('Submitting review:', reviewData);

    try {
      const newReview = await createReview(user.id, attraction_id, comment, rating);

      // console.log('Review submitted successfully:', newReview);
      onAddReview(newReview);
      setRating(0);
      setComment('');
      // Add a success message here

    } catch (error) {
      console.error('Error submitting review:', error.response ? error.response.data : error);
      // Show a user-friendly error message here
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Write a review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with the attraction. Your feedback helps others make informed decisions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
            />
          </div>
          <Button type="submit">Submit Review</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}



export default function ReviewSection({ attraction_id, attractionName, address }) {
  const [reviews, setReviews] = useState([])

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0
    const totalRating = reviews.reduce((acc, review) => acc + (review.rating || 0), 0)
    return (totalRating / reviews.length).toFixed(1)
  }
  const overallRating = calculateAverageRating()
  const totalReviews = reviews.length

  const handleAddReview = (newReview) => {
    setReviews(prevReviews => [newReview, ...prevReviews])
  }

  const handleAddComment = async (reviewId, commentText) => {
    if (!user) {
      console.error('User is not authenticated.');
      // Show a user-friendly message here
      return;
    }

    try {
      // Assuming you have an API function to add a comment
      const newComment = await addComment(reviewId, user.id, commentText);

      setReviews(prevReviews => prevReviews.map(review =>
        review._id === reviewId
          ? { ...review, comments: [...(review.comments || []), newComment] }
          : review
      ));
    } catch (error) {
      console.error('Error adding comment:', error);
      // Show a user-friendly error message here
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByDestination(attraction_id)
        setReviews(data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }
    fetchReviews()
  }, [attraction_id])

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
          <AddReviewModal onAddReview={handleAddReview} attraction_id={attraction_id} />
        </div>
        <div className="space-y-4">
          {reviews.map(review => (
            <ReviewCard key={review._id} review={review} onAddComment={handleAddComment} />
          ))}
        </div>
      </div>
    </div>
  )
}
