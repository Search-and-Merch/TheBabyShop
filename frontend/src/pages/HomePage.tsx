import { Link } from 'react-router'
import RecommendationWidget from '../components/RecommendationWidget'

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

      <RecommendationWidget />
    </div>
  )
}
