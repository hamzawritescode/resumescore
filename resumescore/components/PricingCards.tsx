'use client'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free', price: '$0', description: 'Perfect for trying it out',
    features: ['3 resume scans per month', 'Basic match score', 'Keyword analysis', 'PDF upload support'],
    cta: 'Get Started', href: '/signup', highlighted: false,
  },
  {
    name: 'Pro', price: '$9', period: '/month', description: 'For serious job seekers',
    features: ['Unlimited resume scans', 'Detailed match score', 'AI-powered rewrite suggestions', 'ATS compatibility check', 'Save & compare multiple resumes', 'Priority support'],
    cta: 'Upgrade to Pro', href: '/dashboard', highlighted: true,
  },
]

export function PricingCards() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-gray-600">Start free, upgrade when you are ready</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-8 ${plan.highlighted ? 'bg-blue-600 text-white ring-4 ring-blue-200' : 'bg-white border'}`}>
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="ml-1 text-blue-100">{plan.period}</span>}
              </div>
              <p className={`mt-2 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-blue-600'}`} />
                    <span className={plan.highlighted ? 'text-blue-50' : 'text-gray-700'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className={`mt-8 block w-full rounded-lg px-4 py-3 text-center font-semibold transition-colors ${plan.highlighted ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
