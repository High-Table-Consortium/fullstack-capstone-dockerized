"use client"

import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

const ReviewPage= () => {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting review:', { title, review, date });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Write a Review</h1>
        <div className="flex flex-col md:flex-row">
          {/* Left side - Destination info */}
          <div className="md:w-1/3 pr-6 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">(Destination)</h2>
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg?height=200&width=400&text=Paris"
                alt="Paris"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-200 mx-6"></div>

          {/* Right side - Review form */}
          <div className="md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="visit-date" className="block text-sm font-medium text-gray-700">Date of Visit</label>
                <input
                  type="date"
                  id="visit-date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  onChange={(e) => setDate(e.target.valueAsDate || undefined)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="review-title" className="block text-sm font-medium text-gray-700">Review Title</label>
                <input
                  type="text"
                  id="review-title"
                  placeholder="Give your review a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="review-content" className="block text-sm font-medium text-gray-700">Your Review</label>
                <textarea
                  id="review-content"
                  placeholder="Write your review here"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm min-h-[150px]"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewPage