import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import NavbarMobileMenu from "./NavbarMobileMenu";
import Navbar from "./Navbar";
import { DataContext } from "../../store/context.js";
import logo from "../../assets/img/la-nola-logo-petrol-1_2_m0wusi.png"; // Logo image

const Header = () => {
  const { usersState } = useContext(DataContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white p-4">
      <div className="flex items-center justify-between">
        {/* For Mobile Menu Icon (visible on small screens) */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray hover:text-gray-300 focus:outline-none"
          >
            <FaBars />
          </button>
        </div>

        {/* Logo Here (always visible) */}
        <div className="mx-auto md:mx-0">
          <Link to="/">
            <img src={logo} className="h-auto w-32" alt="La-Nola Logo" />
          </Link>
        </div>

        {/* User profile icon (always visible) */}
        <Link
          to={usersState.isLoggedIn ? "/userprofile" : "/login"}
          className="text-brown text-2xl hover:text-gray-500 focus:outline-none md:hidden"
        >
          <FaUser />
        </Link>

        {/* Sign In, Searchbar, and Shopping Cart in the same row (hidden in small screen) */}
        <div className="flex items-center space-x-4 hidden md:flex">
          {usersState.isLoggedIn && (
            <Link
              to="/userprofile/logout"
              className="text-brown text-2xl hover:text-gray-500 focus:outline-none"
            >
              <MdExitToApp />
            </Link>
          )}
          <Link
            to="/shoppingcart"
            className="text-brown text-2xl hover:text-gray-300 focus:outline-none"
          >
            <FaShoppingCart />
          </Link>
          <FaSearch className="text-brown text-2xl hover:text-gray-300 focus:outline-none" />
        </div>
      </div>

      {/* Separate div for H1 */}
      <div className="text-center mt-4">
        {/* <h1 className="italic text-xl">
          Your unique item made sustainably and with lots of love
        </h1> */}
      </div>

      {/* Desktop Navbar in its own row */}
      <div className="hidden md:block mt-4">
        <Navbar isMobile={false} />
      </div>

      {/* Mobile Menu (visible on small screens) */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity ease-linear duration-300`}
        style={{
          display: isMobileMenuOpen ? "block" : "none", // Show/hide based on isMobileMenuOpen
        }}
      >
        <div
          onClick={toggleMobileMenu}
          className="absolute inset-0 bg-gray"
        ></div>
        {isMobileMenuOpen && (
          <NavbarMobileMenu
            isOpen={isMobileMenuOpen}
            toggleMenu={toggleMobileMenu}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
