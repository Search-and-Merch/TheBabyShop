import { DOCS_URL } from '../constants'

export default function Footer() {
  return (
    <footer className="bg-pink-50 border-t border-pink-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} The Baby Shop — demo site powered by Search &amp; Merch.</p>
        <a
          href={DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:text-pink-800 font-medium transition-colors"
        >
          Search &amp; Merch Docs →
        </a>
      </div>
    </footer>
  )
}
