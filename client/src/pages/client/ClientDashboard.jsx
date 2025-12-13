import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '@/services/Api'

function ClientDashboard() {
  const { jobId } = useParams()
  const [jobs, setJobs] = useState("")

  useEffect(() => {

    const fetchJobs = async () => {
      try {
        const res = await api.get(`/jobs/${jobId}`)
        setJobs(res.data)
        console.log(res.data)
      } catch (error) {
        console.log("error fetching data", error);

      }


    }
    fetchJobs()
  }, [jobId])

  return (
    <div>
      dashboard
    </div>
  )
}

export default ClientDashboard
