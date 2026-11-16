import { StarIcon } from '@heroicons/react/20/solid'

const SIZE_CLASSES = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
}

interface Props {
  rating: number
  max?: number
  size?: keyof typeof SIZE_CLASSES
  showValue?: boolean
  className?: string
}

export default function ReviewStars({ rating, max = 5, size = 'sm', showValue = true, className = '' }: Props) {
  const value = Math.min(Math.max(rating, 0), max)
  const sizeClass = SIZE_CLASSES[size]

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div role="img" aria-label={`Rated ${value.toFixed(1)} out of ${max}`} className="flex">
        {Array.from({ length: max }).map((_, i) => {
          const fill = Math.min(Math.max(value - i, 0), 1)
          return (
            <span key={i} className={`relative ${sizeClass}`}>
              <StarIcon aria-hidden="true" className={`${sizeClass} text-gray-200`} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <StarIcon aria-hidden="true" className={`${sizeClass} max-w-none text-yellow-400`} />
              </span>
            </span>
          )
        })}
      </div>
      {showValue && <span className="text-xs text-gray-500">{value.toFixed(1)}</span>}
    </div>
  )
}
