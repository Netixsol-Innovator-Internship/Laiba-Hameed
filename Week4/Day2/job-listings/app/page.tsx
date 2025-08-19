"use client"

import { useEffect } from "react"
import { useJobStore } from "@/lib/store"
import jobsData from "@/data/jobs.json"
import { JobCard } from "@/components/job-card"
import { FilterBar } from "@/components/filter-bar"

export default function HomePage() {
  const { filteredJobs, setJobs } = useJobStore()

  useEffect(() => {
    setJobs(jobsData)
  }, [setJobs])

  return (
    <div className="min-h-screen bg-cyan-50">
      {/* Header */}
      <div className="bg-[#5ba4a4ff] h-32 bg-[url('/images/bg-header-desktop.svg')] bg-cover bg-center"></div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <FilterBar />

        <div className="space-y-6 mt-8">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center text-gray-500">No jobs match your current filters</div>
            </div>
          ) : (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </div>
      </div>
    </div>
  )
}
