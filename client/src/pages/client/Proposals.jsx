import React, { useEffect, useState } from 'react'
import api from '@/services/Api'

function Proposals() {
  const [proposals, setProposals] = useState([])

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await api.get("/proposal")
        setProposals(res.data)
        console.log(res.data);

      } catch (error) {
        console.log(error.message);
      }
    }

    fetchProposals()
  }, [])
  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
  <div className="max-w-7xl mx-auto">
    
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        All Proposals By Jobs
      </h1>
      <p className="text-gray-600 dark:text-gray-400">Review and manage job proposals from freelancers</p>
    </div>

    {/* Table Container */}
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Bid Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Freelancer ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Freelancer Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Proposal Text
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {proposals.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No proposals yet</h3>
                    <p className="text-gray-500 dark:text-gray-400">Proposals will appear here once freelancers submit them</p>
                  </div>
                </td>
              </tr>
            ) : (
              proposals.map((P) => (
                <tr key={P._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                  
                  {/* Job Title */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {P.JobId?.title || 'N/A'}
                    </div>
                  </td>
                  
                  {/* Description */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate" title={P.JobId?.description}>
                      {P.JobId?.description || 'N/A'}
                    </div>
                  </td>
                  
                  {/* Bid Amount */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      ${P.bidAmount?.toLocaleString() || 'N/A'}
                    </div>
                  </td>
                  
                  {/* Freelancer ID */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-500 dark:text-gray-400 truncate max-w-[100px]" title={P.freelancerId?._id}>
                      {P.freelancerId?._id || 'N/A'}
                    </div>
                  </td>
                  
                  {/* Freelancer Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {(P.freelancerId?.username || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {P.freelancerId?.username || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Proposal Text */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate" title={P.proposalText}>
                      {P.proposalText || 'N/A'}
                    </div>
                  </td>
                  
                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      P.status?.toLowerCase() === 'accepted' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
                        : P.status?.toLowerCase() === 'rejected'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                        : P.status?.toLowerCase() === 'pending'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                    }`}>
                      {P.status || 'N/A'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* Summary Card */}
    {proposals.length > 0 && (
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Proposals</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{proposals.length}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Review</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {proposals.filter(p => p.status?.toLowerCase() === 'pending').length}
            </p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Accepted</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {proposals.filter(p => p.status?.toLowerCase() === 'accepted').length}
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
  )
}

export default Proposals

