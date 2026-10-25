import CTAVideo from '@/components/CTAVideo'
import RecommendationWidget from '@/components/RecommendationWidget'
import pramVideo from '@/assets/Engin-Akyurt-Pram.mp4'

export default function HomePage() {
  return (
    <div>
      <CTAVideo
        video={pramVideo}
        heading="Everything your little one needs"
        description="A demo storefront powered by intelligent search & merchandising — curated products, live facets, and personalised recommendations."
        ctaText="Shop Now"
        ctaLink="/shop"
      />

      <RecommendationWidget />
    </div>
  )
}
