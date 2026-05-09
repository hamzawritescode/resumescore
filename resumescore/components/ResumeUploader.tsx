'use client'
import { useState, useCallback } from 'react'
import { Upload, FileText, X, Loader2 } from 'lucide-react'

interface ResumeUploaderProps {
  onAnalyze: (resumeText: string, jobDesc: string) => void
  isAnalyzing: boolean
}

export function ResumeUploader({ onAnalyze, isAnalyzing }: ResumeUploaderProps) {
  const [resumeText, setResumeText] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [uploadMethod, setUploadMethod] = useState<'paste' | 'file'>('paste')
  const [fileName, setFileName] = useState('')

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setResumeText(text)
    }
    reader.readAsText(file)
  }, [])

  const handleSubmit = () => {
    if (!resumeText.trim() || !jobDesc.trim()) return
    onAnalyze(resumeText, jobDesc)
  }

  const isValid = resumeText.trim().length > 50 && jobDesc.trim().length > 50

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Your Resume</h3>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setUploadMethod('paste')} className={`px-4 py-2 rounded-lg text-sm font-medium ${uploadMethod === 'paste' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Paste Text</button>
          <button onClick={() => setUploadMethod('file')} className={`px-4 py-2 rounded-lg text-sm font-medium ${uploadMethod === 'file' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Upload PDF</button>
        </div>
        {uploadMethod === 'paste' ? (
          <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="Paste your resume text here..."
            className="w-full h-48 p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none" />
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <input type="file" accept=".pdf,.txt,.doc,.docx" onChange={handleFileUpload} className="hidden" id="resume-file" />
            <label htmlFor="resume-file" className="cursor-pointer">
              <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PDF, TXT, DOC up to 5MB</p>
            </label>
            {fileName && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600">
                <FileText className="h-4 w-4" />{fileName}
                <button onClick={() => { setFileName(''); setResumeText('') }} className="text-gray-400 hover:text-red-500"><X className="h-4 w-4" /></button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Job Description</h3>
        <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} placeholder="Paste the job description here..."
          className="w-full h-48 p-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none" />
      </div>
      <button onClick={handleSubmit} disabled={!isValid || isAnalyzing}
        className="w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
        {isAnalyzing ? <><Loader2 className="h-5 w-5 animate-spin" />Analyzing...</> : 'Analyze Match Score'}
      </button>
      {!isValid && (resumeText || jobDesc) && (
        <p className="text-sm text-amber-600 text-center">Please provide both your resume (50+ chars) and job description (50+ chars)</p>
      )}
    </div>
  )
}
