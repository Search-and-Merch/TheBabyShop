export const API_URL = import.meta.env.VITE_API_URL ?? 'https://backend.searchmerch.localhost/api'
export const DOCS_URL = import.meta.env.VITE_DOCS_URL ?? 'https://docs.searchmerch.localhost'
export const ORGANISATION_ID = import.meta.env.VITE_ORGANISATION_ID ?? ''
export const FEED_ID = import.meta.env.VITE_FEED_ID ?? ''
export const RECOMMENDATION_ID = import.meta.env.VITE_RECOMMENDATION_ID ?? ''
export const SEARCH_ID = import.meta.env.VITE_SEARCH_ID ?? ''
export const TRACKING_ID = import.meta.env.VITE_TRACKING_ID ?? ''
// Falls back to the package default (https://backend.searchandmerch.com/api/tracking) when unset
export const TRACKING_URL: string | undefined = import.meta.env.VITE_TRACKING_URL || undefined
