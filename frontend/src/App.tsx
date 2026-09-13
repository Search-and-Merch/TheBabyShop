import { Routes, Route } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import SearchPage from './pages/SearchPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
