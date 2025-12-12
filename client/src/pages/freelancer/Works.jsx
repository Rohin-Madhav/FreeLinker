import React, { useEffect, useState } from 'react'
import api from '@/services/Api'

function Works() {
  const [myWorks, setMyWorks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await api.get("/jobs/my-assignment")
        setMyWorks(res.data)
        console.log(res.data)
      } catch (error) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchWorks()
  }, [])

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800'
  }

  const getPaymentStatusColor = (status) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      unpaid: 'bg-red-100 text-red-800',
      partial: 'bg-yellow-100 text-yellow-800'
    }
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold  mb-2">
            My Assigned Works
          </h1>
          <p >
            Track and manage your freelance assignments
          </p>
        </div>

        {/* Table Container */}
        <div className=" rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : myWorks.length === 0 ? (
            <div className="text-center py-16 px-4">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium  mb-1">No assignments yet</h3>
              <p >Your assigned works will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                {/* Table Header */}
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Freelancer
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Bid Amount
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Amount Paid
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Project Status
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {myWorks.map((w) => (
                    <tr key={w._id} className="hover:bg-blue-50 transition-colors duration-150">
                      {/* Freelancer Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {(w.assignedFreelancer?.username || "U").charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium ">
                              {w.assignedFreelancer?.username || "Unknown User"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Client Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm  font-medium">
                          {w.clientId?.username || "Unknown Client"}
                        </div>
                      </td>

                      {/* Bid Amount */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold ">
                          ${w.bidAmount?.toLocaleString() || '0'}
                        </div>
                      </td>

                      {/* Payment Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(w.paymentStatus)}`}>
                          {w.paymentStatus || 'N/A'}
                        </span>
                      </td>

                      {/* Amount Paid */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">
                          ${w.amountPaid?.toLocaleString() || '0'}
                        </div>
                      </td>

                      {/* Project Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(w.status)}`}>
                          {w.status || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary Card */}
        {myWorks.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-600 mb-1">Total Projects</p>
                <p className="text-2xl font-bold ">{myWorks.length}</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-600 mb-1">Total Bid Amount</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${myWorks.reduce((sum, w) => sum + (w.bidAmount || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-600 mb-1">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  ${myWorks.reduce((sum, w) => sum + (w.amountPaid || 0), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Works