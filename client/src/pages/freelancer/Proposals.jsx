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
  return <div>
    <h1>My Proposals</h1>
 <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {proposal.map((p) => (
          <tr key={p._id}>
            <td>{p.jobId.titile}</td>
            <td>{p.name}</td>
            <td>{p.age}</td>
            <td>{p.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>;
}

export default Proposals;
