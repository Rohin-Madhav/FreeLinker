import React, { useEffect, useState } from 'react'
import api from '@/services/Api'

function Works() {
  const [myWorks, setMyWorks] = useState([])

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await api.get("/jobs/my-assignment")
        setMyWorks(res.data)
        console.log(res.data);
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchWorks()

  }, [])
  return (
    <div>
      <div>
        <h1>My Assigned Works</h1>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
    <table className="min-w-full text-left text-sm text-gray-600">
      
      {/* Table Header */}
      <thead className="bg-gray-50 text-gray-900 font-semibold uppercase tracking-wider border-b border-gray-200">
        <tr>
          <th className="px-6 py-4">Name</th>
          <th className="px-6 py-4">Proposal Text</th>
          <th className="px-6 py-4">Bid Amount</th>
          <th className="px-6 py-4">Status</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="divide-y divide-gray-100">
        {myWorks.map((w) => (
          <tr key={w._id} className="hover:bg-gray-50 transition-colors duration-200">
            
            {/* Name */}
            <td className="px-6 py-4 font-medium text-gray-900">
              {w.freelancerId?.username || "Unknown User"}
            </td>
            
            {/* Proposal Text (Truncated for neatness) */}
            <td className="px-6 py-4 max-w-xs truncate" title={w.proposalText}>
              {w.proposalText}
            </td>
            
            {/* Bid Amount */}
            <td className="px-6 py-4 font-mono text-gray-700">
              ${w.bidAmount}
            </td>
            
            {/* Status */}
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {w.status}
              </span>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
    </div>
  )
}

export default Works
