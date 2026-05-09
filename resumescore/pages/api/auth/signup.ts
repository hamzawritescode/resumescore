import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  const { name, email, password } = req.body
  if (!email || !password || password.length < 8) return res.status(400).json({ message: 'Invalid input' })
  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ message: 'Email already registered' })
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({ data: { name, email, password: hashedPassword } })
    return res.status(201).json({ message: 'User created', userId: user.id })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
