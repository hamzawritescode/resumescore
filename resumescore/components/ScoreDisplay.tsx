'use client'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, ArrowUpRight } from 'lucide-react'

interface ScoreDisplayProps {
  score: number
  keywords: string[]
  missingKeywords: string[]
  suggestions: string[]
}

export function ScoreDisplay({ score, keywords, missingKeywords, suggestions }: ScoreDisplayProps) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-500'
    if (s >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }
  const getScoreBg = (s: number) => {
    if (s >= 80) return 'bg-green-50 border-green-200'
    if (s >= 60) return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      <div className={`rounded-2xl border p-8 text-center ${getScoreBg(score)}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Match Score</h3>
        <div className="relative inline-flex items-center justify-center">
          <svg className="h-32 w-32 transform -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200" />
            <motion.circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className={getScoreColor(score)}
              strokeDasharray={`${2 * Math.PI * 56}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - score / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }} />
          </svg>
          <span className={`absolute text-4xl font-bold ${getScoreColor(score)}`}>{score}</span>
        </div>
        <p className="mt-4 text-gray-700">
          {score >= 80 ? 'Excellent match! Your resume is well-aligned.' : score >= 60 ? 'Good start, but improvements can help.' : 'Needs work. Follow the suggestions below.'}
        </p>
      </div>
      {keywords.length > 0 && (
        <div className="rounded-2xl border bg-white p-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" />Keywords Found ({keywords.length})</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw) => <span key={kw} className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">{kw}</span>)}
          </div>
        </div>
      )}
      {missingKeywords.length > 0 && (
        <div className="rounded-2xl border bg-white p-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><XCircle className="h-5 w-5 text-red-500" />Missing Keywords ({missingKeywords.length})</h4>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((kw) => <span key={kw} className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">{kw}</span>)}
          </div>
        </div>
      )}
      <div className="rounded-2xl border bg-white p-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><AlertCircle className="h-5 w-5 text-blue-500" />AI Suggestions</h4>
        <ul className="space-y-3">
          {suggestions.map((suggestion, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700"><ArrowUpRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" /><span>{suggestion}</span></li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
