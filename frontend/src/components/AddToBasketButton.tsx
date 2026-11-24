import { useState } from 'react'
import { CheckIcon, ShoppingBagIcon } from '@heroicons/react/20/solid'
import { addToBasket } from '@/api/basket'
import { track } from '@/tracking'

interface Props {
  sku: string
  productId?: string
  price?: number | null
  disabled?: boolean
  className?: string
}

export default function AddToBasketButton({ sku, productId, price, disabled = false, className = '' }: Props) {
  const [status, setStatus] = useState<'idle' | 'adding' | 'added' | 'error'>('idle')

  const handleClick = async () => {
    track('add_to_basket', { product_id: productId, sku, quantity: 1, price })
    setStatus('adding')
    try {
      await addToBasket(sku, 1)
      setStatus('added')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || status === 'adding'}
        className="inline-flex items-center gap-2 rounded-full bg-cyan-700 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
      >
        {status === 'added' ? (
          <CheckIcon className="w-5 h-5" aria-hidden="true" />
        ) : (
          <ShoppingBagIcon className="w-5 h-5" aria-hidden="true" />
        )}
        {status === 'adding' ? 'Adding…' : status === 'added' ? 'Added to basket' : 'Add to basket'}
      </button>
      {status === 'error' && (
        <p role="alert" className="mt-2 text-sm text-red-700">Couldn't add to basket. Please try again.</p>
      )}
    </div>
  )
}
