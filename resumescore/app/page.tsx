import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { PricingCards } from '@/components/PricingCards'

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <PricingCards />
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">What Job Seekers Say</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "Went from 2 callbacks to 12 interviews after fixing my resume score from 45 to 82.", author: "Sarah K.", role: "Software Engineer" },
              { quote: "The missing keywords feature alone is worth the $9. Landed my dream job in 3 weeks.", author: "Marcus T.", role: "Product Manager" },
              { quote: "As a career changer, I had no idea what employers wanted. This tool showed me exactly.", author: "Jennifer L.", role: "Data Analyst" },
            ].map((t) => (
              <div key={t.author} className="rounded-2xl border bg-gray-50 p-6 text-left">
                <p className="text-gray-700 italic">&quot;{t.quote}&quot;</p>
                <div className="mt-4">
                  <p className="font-semibold text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
