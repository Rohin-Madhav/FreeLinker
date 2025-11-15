import React, { use, useEffect, useState } from "react";
import api from "../../services/Api";
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";

function FreelancerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
        console.log(res.data);
      } catch (error) {
        setError(error);
        console.log({ message: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <XCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <p className="text-rose-600 text-center font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-grey">All Jobs</h1>
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
              className="group bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300 border border-slate-700 hover:border-blue-500"
            >
              {/* Card Header with Status */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xl font-bold text-white flex-1 leading-tight">
                    {job.title}
                  </h2>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border capitalize ">
                    {job.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 py-4 space-y-4">
                {/* Description */}
                <div>
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                    {job.description}
                  </p>
                </div>

                {/* Budget */}
                <div className="flex items-center gap-2 bg-slate-700 rounded-lg px-4 py-3">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wide">
                      Budget
                    </p>
                    <p className="text-2xl font-bold text-white">
                      ${job.budget.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-4">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FreelancerDashboard;
