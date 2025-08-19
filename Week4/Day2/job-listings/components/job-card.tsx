"use client"

import { useJobStore, type Job } from "@/lib/store"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const { addFilter } = useJobStore()

  const allTags = [job.role, job.level, ...job.languages, ...job.tools]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-lg shadow-md p-6 ${job.featured ? "border-l-4 border-l-cyan-500" : ""}`}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <Image
            src={job.logo || "/placeholder.svg"}
            alt={`${job.company} logo`}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>

        {/* Job Info */}
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-[#5ba4a4ff]">{job.company}</h3>
            {job.new && (
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="bg-[#5ba4a4ff] text-white px-2 py-1 rounded-full text-xs font-bold uppercase"
              >
                New!
              </motion.span>
            )}
            {job.featured && (
              <span className="bg-[#2c3a3aff] text-white px-2 py-1 rounded-full text-xs font-bold uppercase">
                Featured
              </span>
            )}
          </div>

          <h2 className="text-lg font-bold text-[#2c3a3aff] hover:text-cyan-600 cursor-pointer mb-2">{job.position}</h2>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>{job.postedAt}</span>
            <span>•</span>
            <span>{job.contract}</span>
            <span>•</span>
            <span>{job.location}</span>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 md:border-l md:border-gray-200 md:pl-6">
          {allTags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addFilter(tag)}
                className="bg-cyan-50 text-cyan-600 hover:bg-cyan-500 hover:text-white font-bold px-3 py-1 rounded-md text-sm transition-colors"
              >
                {tag}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
