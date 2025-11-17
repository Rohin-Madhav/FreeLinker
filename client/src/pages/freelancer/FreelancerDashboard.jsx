import React, { useEffect, useState } from "react";
import api from "../../services/Api";
import { Briefcase, DollarSign, XCircle } from "lucide-react";

function FreelancerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [proposals,setProposals]=useState({
    bidAmount:"",
    proposalText:""
  })
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  // Fetch job details
  const handleViewDetails = async (jobId) => {
    setSelectedJobId(jobId);
    setLoadingDetails(true);
    setJobDetails(null);
    setError(null);

    try {
      const response = await api.get(`/jobs/${jobId}`);
      setJobDetails(response.data);
    } catch (err) {
      setError("Failed to fetch job details. Please try again.");
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleProposals = async (jobId)=>{
    setLoadi
   setError(null)
   try {
    const res = await api.post("/proposal/create",proposals)
    setProposals(res.data)
    console.log(res.data);
    
   } catch (error) {
    console.error(error);
    
   }
  }

  if (loadingJobs) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-white p-6 shadow-lg rounded-lg max-w-md">
          <XCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <p className="text-center text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold">All Jobs</h1>
          </div>
          <p className="text-slate-400 text-lg">
            {jobs.length} opportunities available
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-slate-800 rounded-lg p-4 border border-slate-700 shadow-md self-start"
            >
              {/* self-start FIXES the stretching issue */}

              <h2 className="text-xl font-bold text-white">{job.title}</h2>

              <div className="mt-3 p-3 bg-slate-700 rounded-lg">
                <p className="text-slate-400 text-xs">Budget</p>
                <p className="text-2xl text-white font-bold">
                  ${job.budget.toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => handleViewDetails(job._id)}
                className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              >
                View Details
              </button>

              {/* DETAILS SECTION */}
              {selectedJobId === job._id && (
                <div className="mt-4 p-4 border-t border-slate-600 text-white">
                  {loadingDetails ? (
                    <p className="text-blue-400">Loading details...</p>
                  ) : jobDetails ? (
                    <>
                      <h4 className="text-lg font-bold text-blue-400 mb-3">
                        Job Details
                      </h4>

                      <p>
                        <strong className="text-slate-400 mr-2">Title:</strong>
                        {jobDetails.title}
                      </p>
                      <p>
                        <strong className="text-slate-400 mr-2">
                          Description:
                        </strong>
                        {jobDetails.description}
                      </p>
                      <p>
                        <strong className="text-slate-400 mr-2">Budget:</strong>
                        ${jobDetails.budget}
                      </p>
                      <p>
                        <strong className="text-slate-400 mr-2">Status:</strong>
                        <span
                          className={
                            jobDetails.status.toLowerCase() === "open"
                              ? "text-green-500"
                              : "text-yellow-500"
                          }
                        >
                          {jobDetails.status}
                        </span>
                      </p>

                      <button
                        onClick={() => {
                          setSelectedJobId(null);
                          setJobDetails(null);
                        }}
                        className="mt-3 text-blue-400 hover:text-blue-300"
                      >
                        Hide Details
                      </button>
                     <div>
                       <button onClick={() => handleProposals(job._id)} className="bg-pink-400" text-white>
                            Make proposal
                      </button>
                     </div>
                    </>
                  ) : (
                    <p className="text-red-400">No details found.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FreelancerDashboard;
