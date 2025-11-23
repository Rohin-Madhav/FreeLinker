import React, { useEffect, useState } from "react";
import api from  "../../services/Api"

function Proposals() {
  const [proposal, setProposal] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await api.get(`/proposal`);
        setProposal(res.data);
        console.log(res.data);
      } catch (error) {
        setError("data fetched err");
        console.error(error.message);
      }
    };
    fetchProposals()
  }, []);
  return <div className="container mx-auto p-6">
  <h1 className="text-3xl font-bold text-gray-800 mb-6">My Proposals</h1>

  {/* Table Container for shadow and rounded corners */}
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
        {proposal.map((p) => (
          <tr key={p._id} className="hover:bg-gray-50 transition-colors duration-200">
            
            {/* Name */}
            <td className="px-6 py-4 font-medium text-gray-900">
              {p.freelancerId?.username || "Unknown User"}
            </td>
            
            {/* Proposal Text (Truncated for neatness) */}
            <td className="px-6 py-4 max-w-xs truncate" title={p.proposalText}>
              {p.proposalText}
            </td>
            
            {/* Bid Amount */}
            <td className="px-6 py-4 font-mono text-gray-700">
              ${p.bidAmount}
            </td>
            
            {/* Status */}
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {p.status}
              </span>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
}

export default Proposals;
