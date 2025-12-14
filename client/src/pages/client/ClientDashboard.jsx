import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '@/services/Api'

function ClientDashboard() {
  const {id} = useParams()
  const [jobs, setJobs] = useState("")

  useEffect(() => {

    const fetchJobs = async () => {
      try {
        const res = await api.get(`/jobs/client/${id}`)
        setJobs(res.data)
        console.log(res.data)
      } catch (error) {
        console.log("error fetching data", error);
      }
    }
    fetchJobs()
  }, [id])

  return (
    <div>
      dashboard
    </div>
  )
}

export default ClientDashboard
