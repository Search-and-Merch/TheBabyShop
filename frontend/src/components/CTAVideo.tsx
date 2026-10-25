import { Link } from 'react-router'

type CTAVideoProps = {
  video: string
  heading: string
  description: string
  ctaText: string
  ctaLink: string
}

export default function CTAVideo({ video, heading, description, ctaText, ctaLink }: CTAVideoProps) {
  return (
    <section className="relative overflow-hidden py-42 px-4">
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-40"
        src={video}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0" aria-hidden="true" />
      <div className="relative container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
          {heading}
        </h1>
        <p className="text-lg text-white mb-8 max-w-xl">
          {description}
        </p>
        <Link
          to={ctaLink}
          className="inline-block bg-cyan-900 hover:bg-cyan-500 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-sm"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  )
}
