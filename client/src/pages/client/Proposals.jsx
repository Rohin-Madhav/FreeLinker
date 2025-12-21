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
    <div>
      <div>
        <h1>All Proposals By Jobs</h1>
      </div>
      <div>
       <table>
  {/* The table header is defined ONCE outside the map function */}
  <thead>
    <tr>
      <th>Month</th>
      <th>Savings</th>
      {/* Add other headers here if your proposal data has more fields */}
    </tr>
  </thead>
  {/* The table body contains dynamic rows */}
  <tbody>
    {/* Use the map function ONLY to generate the rows */}
    {/* Assuming each proposal (P) has 'month' and 'savings' properties based on your example */}
    {proposals.map((P) => (
      // The key should be on the innermost repeating element (the <tr>)
      <tr key={P._id}>
        {/* Replace the hardcoded data with dynamic data from your proposal object (P) */}
        <td>{P._id || 'N/A'}</td>
        <td>{P.month || 'N/A'}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

    </div>
  )
}

export default Proposals

