'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ResumeUploader } from '@/components/ResumeUploader'
import { ScoreDisplay } from '@/components/ScoreDisplay'
import { Lock } from 'lucide-react'
import Link from 'next/link'

interface AnalysisResult {
  score: number
  keywords: string[]
  missingKeywords: string[]
  suggestions: string[]
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [scanCount, setScanCount] = useState(0)
  const [showUpgrade, setShowUpgrade] = useState(false)

  const handleAnalyze = async (resumeText: string, jobDesc: string) => {
    if (!session) { alert('Please sign in to analyze your resume'); return }
    if (!session.user?.isPro && scanCount >= 3) { setShowUpgrade(true); return }

    setIsAnalyzing(true)
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDesc }),
      })
      const data = await response.json()
      if (response.ok) {
        setResult(data)
        setScanCount(prev => prev + 1)
      } else {
        alert(data.message || 'Analysis failed')
      }
    } catch (error) {
      alert('Analysis failed. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Resume Analyzer</h1>
          <p className="mt-2 text-gray-600">
            {session ? `Scans used: ${scanCount}/3 (Free plan)` : 'Sign in to start analyzing'}
          </p>
        </div>

        {!session ? (
          <div className="max-w-md mx-auto text-center rounded-2xl border bg-white p-12">
            <Lock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900">Sign in Required</h2>
            <p className="mt-2 text-gray-600 mb-6">Create a free account to analyze your resume</p>
            <Link href="/login" className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700">
              Sign In Free
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ResumeUploader onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            {result ? (
              <ScoreDisplay {...result} />
            ) : (
              <div className="rounded-2xl border bg-white p-12 flex items-center justify-center text-center">
                <div>
                  <p className="text-gray-500 text-lg">Your analysis results will appear here</p>
                  <p className="text-sm text-gray-400 mt-2">Upload your resume and job description to get started</p>
                </div>
              </div>
            )}
          </div>
        )}

        {showUpgrade && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <h3 className="text-2xl font-bold text-gray-900">Upgrade to Pro</h3>
              <p className="mt-2 text-gray-600">You have used all 3 free scans this month.</p>
              <div className="mt-6 space-y-3">
                <Link href="/pricing" className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700">
                  Upgrade for $9/month
                </Link>
                <button onClick={() => setShowUpgrade(false)} className="block w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-700 font-medium hover:bg-gray-200">
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
