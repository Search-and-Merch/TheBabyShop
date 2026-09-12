import { Link } from 'react-router'
import RecommendationWidget from '../components/RecommendationWidget'

const FEATURES = [
  { icon: '🔍', title: 'Smart Search', desc: 'Relevance-scored product ranking tailored to your feed' },
  { icon: '✨', title: 'Merchandising Rules', desc: 'Boost, filter, and derank products with flexible rules' },
  { icon: '🎯', title: 'Recommendations', desc: 'Personalised product suggestions powered by your data' },
]

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-6xl mb-5">🍼</p>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
            Everything your little one needs
          </h1>
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            A demo storefront powered by intelligent search &amp; merchandising — curated products, live facets, and personalised recommendations.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-sm"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-gray-50 text-center">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <RecommendationWidget />
    </div>
  )
}
