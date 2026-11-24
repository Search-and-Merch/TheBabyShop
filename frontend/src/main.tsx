import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { setup } from '@searchandmerch/tracking'
import App from './App'
import { TRACKING_ID, TRACKING_URL } from './constants'
import './index.css'

if (TRACKING_ID) {
  setup({ trackingId: TRACKING_ID, domain: TRACKING_URL })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
