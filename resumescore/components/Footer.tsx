import Link from 'next/link'
export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">ResumeScore</h3>
            <p className="text-sm text-gray-600">Helping job seekers land their dream jobs with AI-powered resume analysis.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/dashboard" className="hover:text-blue-600">Analyze Resume</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-blue-600">About</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Blog</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">© 2026 ResumeScore. All rights reserved.</div>
      </div>
    </footer>
  )
}
