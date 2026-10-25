import { useState } from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { DOCS_URL } from '@/constants'

const FOOTER_LINKS = [
  {
    heading: 'Shop',
    links: ['New Arrivals', 'Pushchairs', 'Nursery', 'Clothing', 'Gift Cards'],
  },
  {
    heading: 'Customer Care',
    links: ['Contact Us', 'Delivery Information', 'Returns & Refunds', 'FAQs', 'Track Your Order'],
  },
  {
    heading: 'About Us',
    links: ['Our Story', 'Careers', 'Sustainability', 'Privacy Policy', 'Terms & Conditions'],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <>
    <section className="bg-gradient-to-r from-cyan-50 to-blue-50 border-t border-cyan-100 mt-12">
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-cyan-800">Join The Baby Shop newsletter</h2>
          <p className="mt-2 text-cyan-600">
            New arrivals, parenting tips and exclusive offers — straight to your inbox.
          </p>
        </div>

        {subscribed ? (
          <p className="rounded-full bg-white px-6 py-3 text-sm font-medium text-cyan-700 shadow-sm">
            Thanks for signing up! 🎉 Keep an eye on your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <div className="relative flex-1">
              <EnvelopeIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-full border border-cyan-200 bg-white py-3 pl-11 pr-4 text-sm text-cyan-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 transition-colors"
            >
              Sign up
            </button>
          </form>
        )}
      </div>
    </section>
    <footer className="border-t bg-cyan-900 mt-auto">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-cyan-200">
        <p>{new Date().getFullYear()} The Baby Shop / A demo website powered by Search &amp; Merch.</p>
        <a
          href={DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-cyan-800 font-medium transition-colors"
        >
          Read the Search &amp; Merch Docs
        </a>
      </div>
      <div className="border-t border-cyan-800">
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          {FOOTER_LINKS.map(column => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{column.heading}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {column.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-cyan-200 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
    </>
  )
}
