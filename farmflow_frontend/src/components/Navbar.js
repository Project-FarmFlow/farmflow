import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, Phone, Bell, Info, User, Menu, X, Store } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path
      ? "text-green-600"
      : "text-gray-600 hover:text-green-600";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <nav className="bg-white border-b shadow-sm fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 relative z-50">
            <span className="text-xl font-bold text-green-600">FarmFlow</span>
          </Link>

          {/* Hamburger Icon on mobile */}
          <div className="lg:hidden relative z-50">
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none focus:ring-2 focus:ring-green-600 rounded-md"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLinks isActive={isActive} closeMenu={closeMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-16 left-0 right-0 bg-white lg:hidden transition-all duration-300 ease-in-out transform overflow-hidden ${
          isMenuOpen ? "h-auto opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <NavLinks isActive={isActive} closeMenu={closeMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLinks = ({ isActive, closeMenu }) => (
  <>
    <Link
      to="/"
      onClick={closeMenu}
      className={`flex items-center space-x-1 transition-colors duration-200 ${isActive("/")}`}
    >
      <Home size={20} />
      <span>Home</span>
    </Link>

    <Link
      to="/dashboard"
      onClick={closeMenu}
      className={`flex items-center space-x-1 transition-colors duration-200 ${isActive("/dashboard")}`}
    >
      <LayoutDashboard size={20} />
      <span>Dashboard</span>
    </Link>

    <Link
      to="/marketplace"
      onClick={closeMenu}
      className={`flex items-center space-x-1 transition-colors duration-200 ${isActive("/marketplace")}`}
    >
      <Store size={20} />
      <span>Marketplace</span>
    </Link>

    <Link
      to="/notifications"
      onClick={closeMenu}
      className={`flex items-center space-x-1 transition-colors duration-200 ${isActive("/notifications")}`}
    >
      <Bell size={20} />
      <span>Notifications</span>
    </Link>

    <Link
      to="/about-us"
      onClick={closeMenu}
      className={`flex items-center space-x-1 transition-colors duration-200 ${isActive("/about-us")}`}
    >
      <Info size={20} />
      <span>About Us</span>
    </Link>

    <Link
      to="/contact-us"
      onClick={closeMenu}
      className={`flex items-center space-x-1 transition-colors duration-200 ${isActive("/contact-us")}`}
    >
      <Phone size={20} />
      <span>Contact Us</span>
    </Link>

    <Link
      to="/profile"
      onClick={closeMenu}
      className={`flex items-center space-x-1 transition-colors duration-200 ${isActive("/profile")}`}
    >
      <User size={20} />
      <span>Profile</span>
    </Link>
  </>
);

export default Navbar;
