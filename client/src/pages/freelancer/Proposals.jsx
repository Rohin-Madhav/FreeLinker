import React, { useEffect, useState } from "react";
import api from  "../../services/Api"

function Proposals() {
  const [proposal, setProposal] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await api.get(`/proposal/${jobId}`);
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
{proposal.map((p)=>(
  <tr key={p._id}>
    <tr>
    <th>jobId</th>
    <th>bidAmount</th>
    <th>proposalText</th>
    <th>status</th>
  </tr>
  <tr>
    <td>{p.jobId}</td>
  </tr>
</tr>
))}
</table>
  </div>;
}

export default Proposals;
