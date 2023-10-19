import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import NavbarMobileMenu from "./NavbarMobileMenu";
import Navbar from "./Navbar";
import { DataContext } from "../../store/context.js";
import logo from "../../assets/img/la-nola-logo-petrol-1_2_m0wusi.png"; // Logo image
import SearchInput from "../SearchInput";

const Header = () => {
  const {
    usersState,
    setSearchValue,
    searchValue,
    cartState,
    searchState,
    setSearchState,
  } = useContext(DataContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const navigate = useNavigate();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCart = () => {
    navigate("/shoppingcart");
  };

  const toggleSearch = () => {
    setSearchState(!searchState);
    if (searchState) {
      setSearchValue("");
    }
  };

  // Use useEffect to update the cart notification
  useEffect(() => {
    setShowCartNotification(cartState.items.length > 0);
  }, [cartState.items]);

  return (
    <header className="bg-white pt-4 mb-9">
      <div className="flex items-center justify-between relative">
        {/* For Mobile Menu Icon (visible on small screens) */}
        <div className="md:hidden absolute left-0 ml-7 text-lg">
          <button
            onClick={toggleMobileMenu}
            className="text-gray hover:text-gray-300 focus:outline-none"
          >
            <FaBars />
          </button>
        </div>

        {/* Logo Here*/}
        <div className=" mx-auto">
          <Link to="/">
            <img src={logo} className="h-auto w-32" alt="La-Nola Logo" />
          </Link>
        </div>

        {/* Sign In, Searchbar, and Shopping Cart in the same row */}
        <div className="hidden md:flex items-center space-x-4 absolute right-4 ">
          {/* Sign up button */}

          {usersState.isLoggedIn && (
            <Link
              to="/userprofile/logout"
              className="text-brown text-3xl hover:text-gray-500 focus:outline-none"
            >
              <FaSignOutAlt />
            </Link>
          )}
          <Link
            to={usersState.isLoggedIn ? "/userprofile" : "/login"}
            className="text-brown text-2xl hover:text-gray-500 focus:outline-none"
          >
            <FaUser />
          </Link>

          {/* Shopping cart icon */}

          <div className="relative">
            <FaShoppingCart
              onClick={toggleCart}
              className="text-brown text-2xl hover:text-gray-500 focus:outline-none hover:cursor-pointer"
            />
            {showCartNotification && (
              <span className="bg-red-500 text-white rounded-full w-4 h-4 text-xs absolute -top-1 -right-1 flex items-center justify-center">
                {cartState.items.length}
              </span>
            )}
          </div>
          {/* Search icon */}

          <FaSearch
            onClick={toggleSearch}
            className="text-brown text-2xl hover:text-gray-500 focus:outline-none hover:cursor-pointer"
          />
        </div>
      </div>

      {/* Separate div for H1 */}
      <div className="text-center">
        {/* <h1 className="italic text-xl">
          Your unique item made sustainably and with lots of love
        </h1> */}
      </div>

      {/* Desktop Navbar in its own row */}
      <div className="hidden md:block mb-[12px]">
        <Navbar isMobile={false} />
        {searchState ? (
          <SearchInput
            toggleSearch={toggleSearch}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ) : null}
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
            setSearchValue={setSearchValue}
            toggleSearch={toggleSearch}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
