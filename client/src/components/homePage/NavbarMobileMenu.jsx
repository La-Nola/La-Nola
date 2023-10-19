import React, { useState, useContext, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaBook,
  FaSignOutAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { BsPostcardFill } from "react-icons/bs";
import { TbCandle } from "react-icons/tb";
import { LuBaby } from "react-icons/lu";
import { DataContext } from "../../store/context.js";


const NavbarMobileMenu = ({ isOpen, toggleMenu , setSearchValue, toggleSearch }) => {
  const [categories, setCategories] = useState({
    BabyKleidung: false,
    Kerzen: false,
    PostKarten: false,
  });

  const { usersState, cartState } = useContext(DataContext);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Close the mobile menu when the screen size crosses the md breakpoint
    if (screenWidth >= 768) {
      toggleMenu();
    }
  }, [screenWidth, toggleMenu]);

  const toggleCategory = (category) => {
    setCategories((prevCategories) => {
      const updatedCategories = { ...prevCategories };

      // Toggle the clicked category
      updatedCategories[category] = !updatedCategories[category];

      // Close all other categories
      for (const key in updatedCategories) {
        if (key !== category) {
          updatedCategories[key] = false;
        }
      }

      return updatedCategories;
    });
  };

  // a function to format data structure according to the link's call
  function formatSubcategory(subcategory) {
    // Replace commas and spaces with hyphens
    return subcategory.replace(/\/\s/g, "-");
  }
  const toggleCart = () => {
    navigate("/shoppingcart");
  };
  useEffect(() => {
    setShowCartNotification(cartState.items.length > 0);
  }, [cartState.items]);

  
  return (
    <div className="fixed left-0 top-0  h-screen bg-white overflow-y-scroll">
      {/* X button only visible when mobile menu is open */}
      {isOpen && (
        <button
          className="fixed left-0 top-0 m-4 p-2 rounded-md z-10 text-lg"
          onClick={toggleMenu}
        >
          &#10006;
        </button>
      )}

      {isOpen && (
        <div>
          <div className="p-10 relative">
            <div className="absolute top-6 right-14 ">
              <FaShoppingCart
                onClick={toggleCart}
                className="text-brown text-2xl "
              />
              {showCartNotification && (
                <span className="bg-red-500 text-white rounded-full w-4 h-4 text-xs absolute -top-1 -right-1 flex items-center justify-center">
                  {cartState.items.length}
                </span>
              )}
            </div>

            {/* User Profile Icon */}
            <div className="absolute top-6 right-4 ">
              <Link
                to={usersState.isLoggedIn ? "/userprofile" : "/login"}
                className="text-brown text-2xl "
                onClick={toggleMenu}
              >
                <FaUser />
              </Link>
            </div>
            <div className="mt-20">
              <div className="mb-4 relative ">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border rounded-full px-4 py-2 w-full focus:border-white focus:outline-none pl-10"
                  onChange={(e) => setSearchValue(e.target.value)}
              />
                <span className="absolute left-3 top-2 text-gray-500" >🔍</span>
              </div>
            </div>

            {/* Babykleidung Group */}
            <div className="mt-8 pt-8">
              <div className="mb-4  border-t border-gray-800 pt-2">
                <div
                  className={`cursor-pointer flex items-center justify-between  ${
                    categories["BabyKleidung"]
                      ? "bg-gray-400 border rounded-xl p-2 "
                      : ""
                  }`}
                  onClick={() => toggleCategory("BabyKleidung")}
                >
                <Link
                    to="/kidsclothes" // Add the main category route
                    className="hover:scale-110 flex items-center"
                    onClick={toggleMenu}
                  >  
                    <LuBaby className="mr-2" />
                    BabyKleidung
                    </Link>
                  <span className="cursor-pointer">
                    {categories["BabyKleidung"] ? "➖" : "➕"}
                  </span>
                </div>
                {categories["BabyKleidung"] && (
                  <ul className="ml-4 py-3">
                    <li>
                      <Link
                        to="/kidsclothes/jacken"
                        className="block py-2 px-3 hover:bg-gray-200 hover:rounded-xl "
                        onClick={toggleMenu}
                      >
                        Jacken
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/kidsclothes/pullover"
                        className="block py-2 px-3 hover:bg-gray-200 hover:rounded-xl "
                        onClick={toggleMenu}
                      >
                        Pullover
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/kidsclothes/upcycling"
                        className="block py-2 px-3 hover:bg-gray-200 hover:rounded-xl "
                        onClick={toggleMenu}
                      >
                        Upcycling
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/kidsclothes/muetzen"
                        className="block py-2 px-3 hover:bg-gray-200 hover:rounded-xl "
                        onClick={toggleMenu}
                      >
                        Mützen
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/kidsclothes/westen"
                        className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                        onClick={toggleMenu}
                      >
                        Westen
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/kidsclothes/overalls"
                        className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                        onClick={toggleMenu}
                      >
                        OverAll
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/kidsclothes/hosen"
                        className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                        onClick={toggleMenu}
                      >
                        Hosen
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div className="mb-4  border-t border-gray-800 pt-2">
              <div
                className={`cursor-pointer flex items-center justify-between  ${
                  categories["Kerzen"]
                    ? "bg-gray-400 border rounded-xl p-2"
                    : ""
                }`}
                onClick={() => toggleCategory("Kerzen")}
              >

                  <Link
                    to="/candles" // Add the main category route
                    className="hover:scale-110 flex items-center"
                    onClick={toggleMenu}
                  >
                  <TbCandle className="mr-2" />
                  Kerzen
                  </Link>
                <span className="cursor-pointer">
                  {categories["Kerzen"] ? "➖" : "➕"}
                </span>
              </div>
              {categories["Kerzen"] && (
                <ul className="ml-4 py-3">
                  <li>
                    <Link
                      to="/candles/geburts-taufkerzen"
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      Geburts-Taufkerzen
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/candles/gedenkkerzen"
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      Gedenkkerzen
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/candles/grußkerzen"
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      Grußkerzen
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/candles/hochzeitskerzen"
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      Hochzeitskerzen
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/candles/osterkerzen"
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      Osterkerzen
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/candles/stabkerzen"
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      Stabkerzen
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/candles/weihnachtskerzen"
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      Weihnachtskerzen
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="mb-4 pt-2 border-t border-gray-800 ">
              <div
                className={`cursor-pointer flex items-center justify-between  ${
                  categories["PostKarten"]
                    ? "bg-gray-400 border rounded-xl p-2"
                    : ""
                }`}
                onClick={() => toggleCategory("PostKarten")}
              >
                  <Link
                     to="/postcards" // Add the main category route
                    className="mb-2  hover:scale-105 flex items-center"
                    onClick={toggleMenu}
                  >
                  <BsPostcardFill className="mr-2" />
                  PostKarten
                  </Link>                
                  <span className="cursor-pointer">
                  {categories["PostKarten"] ? "➖" : "➕"}
                </span>
              </div>
              {categories["PostKarten"] && (
                <ul className="ml-4 py-3">
                  <li>
                    <Link
                      to="/postcards/blumenmotive"
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      Blumenmotive
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/postcards/grusskarten"
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      GrussKarten
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/postcards/blumenmotiv"
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      Blumenmotiv
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/postcards/koerper"
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      Körper
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/postcards/tiermotive"
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      Tiermotive
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={`/postcards/${formatSubcategory(
                        "herbst, weihnachten"
                      )} `}
                      className="block py-2 px-3  hover:bg-gray-200 hover:rounded-xl "
                      onClick={toggleMenu}
                    >
                      Herbst-Weihnachten
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="mb-4 border-t border-gray-800 pt-4 flex items-center">
              <FaInfoCircle className="mr-2" />
              <Link
                to="/aboutme"
                className="hover:text-lg transition duration-200 ease-in-out"
                onClick={toggleMenu}
              >
                Über mich
              </Link>
            </div>

            <div className="mb-4 border-t border-gray-800 pt-4 flex items-center">
              <FaBook className="mr-2" />
              <Link
                to="/stories"
                className="hover:text-lg transition duration-200 ease-in-out"
                onClick={toggleMenu}
              >
                Stories
              </Link>
            </div>

            <div className="mb-4 border-t border-gray-800 pt-4 ">
              {/* Logout Button (if logged in) */}
              {usersState.isLoggedIn && (
                <Link
                  to="/userprofile/logout"
                  className="text-brown text-md flex items-center"
                  onClick={toggleMenu}
                >
                  <FaSignOutAlt className="mr-2" />
                  Abmelden
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMobileMenu;
