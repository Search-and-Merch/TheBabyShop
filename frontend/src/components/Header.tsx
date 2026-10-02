import { Link, NavLink } from 'react-router'
import SearchBar from './SearchBar'

export default function Header() {

  const activeNavLinkClass = 'text-pink-600 border-b-2 border-pink-600';
  const inactiveNavLinkClass = 'text-gray-600 border-b-2 border-transparent hover:text-pink-600 transition-colors';

  return (
    <header className="bg-pink-50 border-b border-pink-100 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🍼</span>
          <span className="text-xl font-bold text-pink-700">The Baby Shop</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? activeNavLinkClass
                : inactiveNavLinkClass
            }
          >
            Home
          </NavLink>
          <NavLink
            to="shop"
            className={({ isActive }) =>
              isActive
                ? activeNavLinkClass
                : inactiveNavLinkClass
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/pushchairs"
            className={({ isActive }) =>
              isActive
                ? activeNavLinkClass
                : inactiveNavLinkClass
            }
          >
            Pushchairs
          </NavLink>
          <SearchBar />
        </nav>
      </div>
    </header>
  )
}
