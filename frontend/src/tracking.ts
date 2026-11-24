import { sendEvent, type EventType } from '@searchandmerch/tracking'
import { TRACKING_ID } from '@/constants'

// setup() only runs when VITE_TRACKING_ID is set (see main.tsx), so skip events otherwise
export function track(type: EventType, data: unknown) {
  if (!TRACKING_ID) return
  sendEvent(type, data)
}
