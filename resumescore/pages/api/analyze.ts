import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function extractKeywords(text: string): string[] {
  const commonWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'])
  const words = text.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !commonWords.has(w))
  const freq: Record<string, number> = {}
  words.forEach(w => freq[w] = (freq[w] || 0) + 1)
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([word]) => word)
}

function calculateScore(resumeText: string, jobDesc: string) {
  const resumeKeywords = extractKeywords(resumeText)
  const jobKeywords = extractKeywords(jobDesc)
  const matched = jobKeywords.filter(kw => resumeKeywords.includes(kw))
  const missing = jobKeywords.filter(kw => !resumeKeywords.includes(kw))
  const matchRate = jobKeywords.length > 0 ? matched.length / jobKeywords.length : 0
  const baseScore = Math.round(matchRate * 100)
  const lengthBonus = resumeText.length > 1000 ? 5 : 0
  const score = Math.min(100, Math.max(0, baseScore + lengthBonus))
  const suggestions: string[] = []
  if (missing.length > 5) suggestions.push(`Add ${missing.slice(0, 5).join(', ')} to your resume to better match this job.`)
  if (resumeText.length < 500) suggestions.push('Your resume seems short. Add more detail about your achievements and responsibilities.')
  if (!resumeText.includes('%') && !resumeText.includes('$')) suggestions.push('Add quantifiable achievements (e.g., "Increased sales by 25%" or "Managed $50K budget").')
  if (!resumeText.toLowerCase().includes('skills') && !resumeText.toLowerCase().includes('experience')) suggestions.push('Ensure clear section headers like "Skills" and "Experience" for ATS compatibility.')
  if (suggestions.length === 0) suggestions.push('Great job! Your resume is well-optimized. Consider adding a brief summary statement.')
  return { score, keywords: matched.slice(0, 10), missingKeywords: missing.slice(0, 10), suggestions }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  const session = await getSession({ req })
  if (!session?.user?.email) return res.status(401).json({ message: 'Unauthorized' })
  const { resumeText, jobDesc } = req.body
  if (!resumeText || !jobDesc || resumeText.length < 50 || jobDesc.length < 50) return res.status(400).json({ message: 'Invalid input' })
  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email }, include: { resumes: { orderBy: { createdAt: 'desc' }, take: 3 } } })
    if (!user) return res.status(404).json({ message: 'User not found' })
    const recentScans = user.resumes.filter(r => r.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    if (!user.isPro && recentScans.length >= 3) return res.status(403).json({ message: 'Free scan limit reached' })
    const result = calculateScore(resumeText, jobDesc)
    await prisma.resume.create({
      data: { userId: user.id, content: resumeText.substring(0, 5000), jobDesc: jobDesc.substring(0, 5000), score: result.score, feedback: JSON.stringify(result) }
    })
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Analysis failed' })
  }
}
