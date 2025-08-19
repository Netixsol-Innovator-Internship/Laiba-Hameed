import { create } from "zustand"

export interface Job {
  id: number
  company: string
  logo: string
  new: boolean
  featured: boolean
  position: string
  role: string
  level: string
  postedAt: string
  contract: string
  location: string
  languages: string[]
  tools: string[]
}

interface JobStore {
  jobs: Job[]
  filteredJobs: Job[]
  activeFilters: string[]
  setJobs: (jobs: Job[]) => void
  addFilter: (filter: string) => void
  removeFilter: (filter: string) => void
  clearFilters: () => void
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  filteredJobs: [],
  activeFilters: [],

  setJobs: (jobs) => {
    set({ jobs, filteredJobs: jobs })
  },

  addFilter: (filter) => {
    const { activeFilters, jobs } = get()
    if (!activeFilters.includes(filter)) {
      const newFilters = [...activeFilters, filter]
      const filtered = jobs.filter((job) => {
        const jobTags = [job.role, job.level, ...job.languages, ...job.tools]
        return newFilters.every((f) => jobTags.includes(f))
      })
      set({
        activeFilters: newFilters,
        filteredJobs: filtered,
      })
    }
  },

  removeFilter: (filter) => {
    const { activeFilters, jobs } = get()
    const newFilters = activeFilters.filter((f) => f !== filter)
    const filtered =
      newFilters.length === 0
        ? jobs
        : jobs.filter((job) => {
            const jobTags = [job.role, job.level, ...job.languages, ...job.tools]
            return newFilters.every((f) => jobTags.includes(f))
          })
    set({
      activeFilters: newFilters,
      filteredJobs: filtered,
    })
  },

  clearFilters: () => {
    const { jobs } = get()
    set({
      activeFilters: [],
      filteredJobs: jobs,
    })
  },
}))
