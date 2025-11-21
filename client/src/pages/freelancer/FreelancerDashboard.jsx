import React, { useEffect, useState } from "react";
import api from "../../services/Api";
import { Briefcase, DollarSign, XCircle, Send } from "lucide-react";
import { toast } from "react-toastify";

function FreelancerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [currentJobForProposal, setCurrentJobForProposal] = useState(null);

  const [formData, setFormData] = useState({
    bidAmount: "",
    proposalText: "",
  });

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

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

  // --- Proposal Handlers ---

  const openProposalForm = (job) => {
    setCurrentJobForProposal(job); // Set the current job details
    setShowProposalForm(true); // Open the form modal
    setFormData({
      bidAmount: "",
      proposalText: "",
    });
  };

  const closeProposalForm = () => {
    setShowProposalForm(false);
    setCurrentJobForProposal(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!currentJobForProposal?._id) return;

    try {
      const dataToSend = {
        ...formData,
        jobId: currentJobForProposal._id,
      };

      const res = await api.post("/proposal/create", dataToSend);
      console.log("Proposal successful:", res.data);

      closeProposalForm();
      toast.success("Proposal submitted successfully!");
    } catch (error) {
      console.error(error);
      setError("Failed to submit proposal.");
    }
  };

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
        {/* Header (remains the same) */}
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
              <h2 className="text-xl font-bold text-white">{job.title}</h2>

              <div className="mt-3 p-3 bg-slate-700 rounded-lg">
                <p className="text-slate-400 text-xs">Budget</p>
                <p className="text-2xl text-white font-bold">
                  ${job.budget.toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => handleViewDetails(job._id)}
                className="mt-4 cursor-pointer w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              >
                View Details
              </button>

              {/* DETAILS SECTION (updated with Make Proposal button) */}
              {selectedJobId === job._id && (
                <div className="mt-4 p-4 border-t border-slate-600 text-white">
                  {loadingDetails ? (
                    <p className="text-blue-400">Loading details...</p>
                  ) : jobDetails ? (
                    <>
                      <h4 className="text-lg font-bold text-blue-400 mb-3">
                        Job Details
                      </h4>
                      {/* ... other details (title, description, budget, etc.) ... */}
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
                        <strong className="text-slate-400 mr-2">
                          Deadline:
                        </strong>
                        {jobDetails.deadline}
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
                        className="mt-3 cursor-pointer text-blue-400 hover:text-blue-300"
                      >
                        Hide Details
                      </button>

                      {/* The Make Proposal Button */}
                      <div className="mt-4">
                        <button
                          onClick={() => openProposalForm(jobDetails)}
                          className="w-full cursor-pointer py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Make Proposal
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

      {showProposalForm && currentJobForProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 p-6 rounded-lg shadow-2xl max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">
                Submit Proposal for:
              </h2>
              <button
                onClick={closeProposalForm}
                className="text-slate-400 hover:text-white transition duration-200"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <p className="text-blue-400 mb-4 text-lg font-semibold">
              {currentJobForProposal.title}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="bidAmount"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Bid Amount ($)
                </label>
                <input
                  type="number"
                  id="bidAmount"
                  name="bidAmount"
                  value={formData.bidAmount}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="proposalText"
                  className="block text-sm font-medium text-slate-300 mb-1"
                >
                  Proposal Text
                </label>
                <textarea
                  id="proposalText"
                  name="proposalText"
                  rows="4"
                  value={formData.proposalText}
                  onChange={handleChange}
                  required
                  className="w-full p-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeProposalForm}
                  className="px-4 cursor-pointer py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-200"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FreelancerDashboard;
