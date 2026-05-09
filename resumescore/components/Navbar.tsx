'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { FileText, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">ResumeScore</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600">Analyze</Link>
          <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600">Pricing</Link>
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{session.user?.email}</span>
              <button onClick={() => signOut()} className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">Sign Out</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">Log In</Link>
              <Link href="/signup" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Get Started</Link>
            </div>
          )}
        </div>
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          <Link href="/" className="block text-sm font-medium text-gray-700">Home</Link>
          <Link href="/dashboard" className="block text-sm font-medium text-gray-700">Analyze</Link>
          <Link href="/pricing" className="block text-sm font-medium text-gray-700">Pricing</Link>
          {session ? (
            <button onClick={() => signOut()} className="block text-sm font-medium text-red-600">Sign Out</button>
          ) : (
            <>
              <Link href="/login" className="block text-sm font-medium text-gray-700">Log In</Link>
              <Link href="/signup" className="block text-sm font-medium text-blue-600">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
