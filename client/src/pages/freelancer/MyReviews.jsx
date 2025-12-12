import React, { useEffect, useState } from 'react'
import api from '@/services/Api'
import { useParams } from 'react-router-dom'

function MyReviews() {
  const { id } = useParams()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await api.get(`/review/${id}`)
        setReviews(res.data || [])
      } catch (error) {
        console.error('Failed to load reviews', error.message)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    fetchReview()
  }, [id])

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.044 9.393c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69L9.05 2.927z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">All Reviews</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Showing {reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <svg className="animate-spin h-8 w-8 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      ) : reviews.length === 0 ? (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-md shadow-sm text-center text-gray-600 dark:text-gray-300">
          No reviews yet.
        </div>
      ) : (
        <ul className="grid gap-4">
          {reviews.map((r) => (
            <li key={r._id || r.jobId || Math.random()} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-100 font-medium">
                    {r.reviewerId?.username ? r.reviewerId.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{r.reviewerId?.username || r.reviewerId || 'Anonymous'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{r.jobId?.title || 'Job'}</div>
                  </div>
                </div>

                <div className="text-right">
                  {renderStars(r.rating || 0)}
                  <div className="text-xs text-gray-400 dark:text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="mt-3 text-gray-700 dark:text-gray-200">
                {r.comment || <span className="text-gray-400 dark:text-gray-500 italic">No comment provided.</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyReviews
