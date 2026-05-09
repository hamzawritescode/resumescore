'use client'
import { Upload, FileSearch, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  { icon: Upload, title: 'Upload Your Resume', description: 'Drag and drop your PDF or paste your resume text directly.' },
  { icon: FileSearch, title: 'Paste Job Description', description: 'Copy any job posting and paste it into our analyzer.' },
  { icon: Zap, title: 'Get Your Score & Fixes', description: 'Receive a 0-100 match score and specific improvements.' },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600">Three simple steps to a better resume</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }} viewport={{ once: true }}
              className="relative rounded-2xl border bg-gray-50 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white mb-4">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
