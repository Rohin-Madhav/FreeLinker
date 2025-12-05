import React, { useEffect, useState } from 'react'
import api from '@/services/Api'

function Works() {
  const [myWorks, setMyWorks] = useState("")

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await api.get("/jobs/my-assignment")
        setMyWorks(res.data)
        console.log(res.data);
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchWorks()

  }, [])
  return (
    <div>
      my works
    </div>
  )
}

export default Works
