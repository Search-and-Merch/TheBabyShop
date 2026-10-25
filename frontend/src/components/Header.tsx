import { Link, NavLink } from 'react-router'
import SearchBar from './SearchBar'
import theBabyShopLogo from './the-baby-shop-logo.png'

export default function Header() {

  const activeNavLinkClass = 'text-cyan-600 border-cyan-500';
  const inactiveNavLinkClass = 'text-gray-600 hover:text-cyan-700 transition-colors';

  return (
    <header className="sticky bg-white border-b-2 border-cyan-500 top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img className="h-9" src={theBabyShopLogo} />
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
