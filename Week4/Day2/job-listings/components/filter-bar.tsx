"use client"

import { useJobStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FilterBar() {
  const { activeFilters, removeFilter, clearFilters } = useJobStore()

  if (activeFilters.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between flex-wrap gap-4"
    >
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {activeFilters.map((filter) => (
            <motion.div
              key={filter}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center bg-cyan-50 text-cyan-600 px-3 py-1 rounded-md text-sm font-medium"
            >
              <span>{filter}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeFilter(filter)}
                className="ml-2 hover:bg-cyan-600 hover:text-white rounded-sm p-1 transition-colors"
              >
                <X size={12} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="text-cyan-600 hover:text-cyan-700 hover:underline font-medium"
        >
          Clear
        </Button>
      </motion.div>
    </motion.div>
  )
}
