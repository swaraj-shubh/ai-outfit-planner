import React, { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { AuthContext } from "../context/AuthContext"

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { token, logout } = useContext(AuthContext)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getLinkClass = (path) => {
    return `px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-800 hover:text-white ${
      location.pathname === path
        ? "text-white font-semibold bg-gray-800"
        : "text-gray-300"
    }`
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="bg-black text-white shadow-xl w-full sticky top-0 z-50">
      <div className="container flex items-center justify-between p-4 mx-auto">

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Logo */}
        <Link
          to="/dashboard"
          className="hidden md:block text-xl font-bold tracking-wide"
        >
          AI Stylist
        </Link>

        {/* Desktop Navigation */}
        {token && (
          <NavigationMenu className="hidden md:block w-full">
            <NavigationMenuList className="flex gap-4 w-full items-center">

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                    Dashboard
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/wardrobe" className={getLinkClass("/wardrobe")}>
                    Wardrobe
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/chat" className={getLinkClass("/chat")}>
                    AI Chat
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <div className="ml-auto flex items-center gap-4">

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link to="/profile" className={getLinkClass("/profile")}>
                      Profile
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Button
                    variant="secondary"
                    onClick={handleLogout}
                    className="bg-white text-black font-semibold hover:bg-gray-200"
                  >
                    Logout
                  </Button>
                </NavigationMenuItem>

              </div>

            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && token && (
        <div className="md:hidden bg-gray-900 shadow-lg">
          <div className="flex flex-col p-4 space-y-3">

            <Link
              to="/dashboard"
              className={getLinkClass("/dashboard")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              to="/wardrobe"
              className={getLinkClass("/wardrobe")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Wardrobe
            </Link>

            <Link
              to="/chat"
              className={getLinkClass("/chat")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AI Chat
            </Link>

            <Link
              to="/profile"
              className={getLinkClass("/profile")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>

            <Button
              onClick={() => {
                handleLogout()
                setIsMobileMenuOpen(false)
              }}
              className="bg-white text-black font-semibold hover:bg-gray-200 text-left"
            >
              Logout
            </Button>

          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar