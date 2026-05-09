'use client'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 mb-6">
              <Sparkles className="h-4 w-4" />
              Trusted by 2,000+ job seekers
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Get Your Resume Scored Against <span className="text-blue-600">Any Job</span> in 30 Seconds
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Upload your resume, paste the job description, and get an instant match score with actionable fixes to land more interviews.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700 transition-colors">
                Score My Resume Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="text-sm text-gray-500">No credit card required • 3 free scans</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
