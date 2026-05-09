import { PricingCards } from '@/components/PricingCards'

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Pricing</h1>
          <p className="mt-4 text-lg text-gray-600">Choose the plan that fits your job search</p>
        </div>
        <PricingCards />
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Can I cancel anytime?", a: "Yes, you can cancel your Pro subscription at any time. You will keep access until the end of your billing period." },
              { q: "Is my resume data safe?", a: "Absolutely. We do not store your resume content permanently. It is only used for the analysis and then discarded." },
              { q: "What file formats are supported?", a: "We support PDF, TXT, DOC, and DOCX files up to 5MB. You can also paste text directly." },
              { q: "How accurate is the score?", a: "Our algorithm analyzes keyword matching, formatting, and content quality. It is a strong indicator, but we recommend using it alongside human review." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-lg border bg-white p-6">
                <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                <p className="mt-2 text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
