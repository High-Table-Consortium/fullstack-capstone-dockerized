import React, { useState, useEffect } from 'react'
import { Star } from "lucide-react"

export default function ReviewCard() {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments')
        if (!response.ok) {
          throw new Error('Failed to fetch comments')
        }
        const data = await response.json()
        setComments(data)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load comments. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [])

  return (
    <div className="p-8 bg-yellow-100 min-h-screen flex items-center justify-center">
      <style>{`
        .shadow-neumorphic {
          box-shadow: 
            12px 12px 24px #d1d1d1,
            -12px -12px 24px #ffffff;
        }
      `}</style>

      {isLoading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && comments.map((comment) => (
        <div key={comment.id} className="w-full max-w-md mx-auto bg-gray-100 rounded-xl shadow-neumorphic mb-4">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{comment.username}</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < comment.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <p className="text-gray-600">{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


