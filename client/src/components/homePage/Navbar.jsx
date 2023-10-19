import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { gsap } from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Smooth Scroll Lenis
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const Navbar = ({ isMobile }) => {
  const [babyKleidungVisible, setBabyKleidungVisible] = useState(false);
  const [kerzenVisible, setKerzenVisible] = useState(false);
  const [postkartenVisible, setPostkartenVisible] = useState(false);
  const [leaveTimeout, setLeaveTimeout] = useState(null);
  const navRef = useRef(null);
  const arrowNav = useRef(null);
  // uselayouteffect
  useLayoutEffect(() => {
    const el = navRef.current;
    const elArrow = arrowNav.current;
    gsap.set(el, {
      backgroundColor: "transparent",
      paddingTop: "0.125rem",
    });
    gsap.set(elArrow, {
      yPercent: -100,
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        start: "top+=70",
        end: "+=1",
        toggleActions: "play none none reverse",
        scrub: true,
      },
    });
    tl.to(el, {
      backgroundColor: "#fff",
      borderBottom: "1px solid rgb(229, 231,235)",
      marginTop: 0,
      paddingTop: "1.25rem",
      top: 0,
      opacity: 1,
    }).to(elArrow, {
      yPercent: 0,
    });

    return () => {};
  }, []);
  const handleScrollUp = () => {
    lenis.scrollTo("top", {
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };
  const toggleBabyKleidungDropdown = () => {
    setBabyKleidungVisible(!babyKleidungVisible);
  };

  const toggleKerzenDropdown = () => {
    setKerzenVisible(!kerzenVisible);
  };

  const togglePostkartenDropdown = () => {
    setPostkartenVisible(!postkartenVisible);
  };

  const closeAllDropdowns = () => {
    setBabyKleidungVisible(false);
    setKerzenVisible(false);
    setPostkartenVisible(false);
  };
  const handleMouseEnter = (dropdownFunction) => {
    closeAllDropdowns();
    clearTimeout(leaveTimeout);
    dropdownFunction();
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      closeAllDropdowns();
    }, 300);
    setLeaveTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      clearTimeout(leaveTimeout);
    };
  }, [leaveTimeout]);
  if (isMobile) {
    return null;
  }

  // a function to format data structure according to the link's call
  function formatSubcategory(subcategory) {
    // Replace commas and spaces with hyphens
    return subcategory.replace(/\/\s/g, "-");
  }

  return (
    <>
      <nav
        className="mt-2 text-center fixed w-full z-10 h-14 flex"
        ref={navRef}
      >
        <ul className="flex justify-center space-x-10 flex-grow [&>li>button]:tracking-wide [&>li>ul]:before:transition-transform [&>li>ul]:before:duration-300 [&>li>ul]:before:origin-left [&>li>ul]:before:scale-x-0 [&>li>ul]:before:hover:scale-x-100">
          {/* Babykleidung Group */}
          <NavLink
            to="/kidsclothes"
            className="relative group"
            onMouseEnter={() => handleMouseEnter(toggleBabyKleidungDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <button className="text-black  mb-3 cursor-pointer ">
              Baby Kleidung <ArrowDownIcon />
              {babyKleidungVisible}
            </button>
            <ul
              className={`absolute ${
                babyKleidungVisible ? "visible" : "invisible"
              } z-40 flex flex-col bg-white py-1 px-4  shadow-2xl [&>li>*:hover]:text-gray-600 before:absolute before:bg-slate-900 before:h-0.5 before:w-full before:left-0 before:bottom-full`}
            >
              {/* Menu items */}

              <Link
                to="/kidsclothes/jacken"
                className="block py-3 px-12  hover:text-gray-600  "
              >
                Jacken
              </Link>
              <li>
                <Link to="/kidsclothes/pullover" className="block py-3    ">
                  Pullover
                </Link>
              </li>
              <li>
                <Link to="/kidsclothes/upcycling" className="block py-3    ">
                  Upcycling
                </Link>
              </li>

              <li>
                <Link to="/kidsclothes/muetzen" className="block py-3    ">
                  Mützen
                </Link>
              </li>
              <li>
                <Link to="/kidsclothes/westen" className="block py-3    ">
                  Westen
                </Link>
              </li>
              <li>
                <Link to="/kidsclothes/overalls" className="block py-3">
                  OverAll
                </Link>
              </li>
              <li>
                <Link to="/kidsclothes/hosen" className="block py-3">
                  Hosen
                </Link>
              </li>
            </ul>
          </NavLink>
          {/* Kerzen Group */}
          <NavLink
            to="/candles"
            className="relative group "
            onMouseEnter={() => handleMouseEnter(toggleKerzenDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <button className="text-black mb-3  cursor-pointer">
              Kerzen <ArrowDownIcon />
              {kerzenVisible}
            </button>
            <ul
              className={`absolute ${
                kerzenVisible ? "visible" : "invisible"
              } z-50 flex flex-col bg-white py-1 px-4  shadow-2xl [&>li>*:hover]:text-gray-600 before:absolute before:bg-slate-900 before:h-0.5 before:w-full before:left-0 before:bottom-full`}
            >
              {/* Menu items */}
              <li>
                <Link
                  to="/candles/geburts-taufkerzen"
                  className="block py-3    "
                >
                  Geburts-Taufkerzen
                </Link>
              </li>
              <li>
                <Link to="/candles/gedenkkerzen" className="block py-2    ">
                  Gedenkkerzen
                </Link>
              </li>
              <li>
                <Link to="/candles/grußkerzen" className="block py-2    ">
                  Grußkerzen
                </Link>
              </li>
              <li>
                <Link to="/candles/hochzeitskerzen" className="block py-2    ">
                  Hochzeitskerzen
                </Link>
              </li>
              <li>
                <Link to="/candles/osterkerzen" className="block py-2    ">
                  Osterkerzen
                </Link>
              </li>
              <li>
                <Link to="/candles/stabkerzen" className="block py-2    ">
                  Stabkerzen
                </Link>
              </li>
              <li>
                <Link to="/candles/weihnachtskerzen" className="block py-2    ">
                  Weihnachtskerzen
                </Link>
              </li>
            </ul>
          </NavLink>
          {/* Postcard Group */}
          <NavLink
            to="/postcards"
            className="relative group"
            onMouseEnter={() => handleMouseEnter(togglePostkartenDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <button className="text-black mb-3  cursor-pointer">
              Postkarten
              <ArrowDownIcon />
              {postkartenVisible}
            </button>
            <ul
              className={`absolute ${
                postkartenVisible ? "visible" : "invisible"
              } z-50 flex flex-col bg-white py-1 px-4  shadow-2xl [&>li>*:hover]:text-gray-600 before:absolute before:bg-slate-900 before:h-0.5 before:w-full before:left-0 before:bottom-full`}
            >
              {/* Menu items */}
              <li>
                <Link
                  to="/postcards/blumenmotive"
                  className="block py-3  hover:text-gray-600  "
                >
                  Blumenmotive
                </Link>
              </li>
              <li>
                <Link to="/postcards/grusskarten" className="block py-3    ">
                  GrussKarten
                </Link>
              </li>

              <li>
                <Link to="/postcards/koerper" className="block py-3    ">
                  Körper
                </Link>
              </li>
              <li>
                <Link
                  to={`/postcards/${formatSubcategory("herbst, weihnachten")} `}
                  className="block py-3  hover:bg-gray-100 hover:rounded-xl hover:scale-105"
                >
                  Herbst-Weihnachten
                </Link>
              </li>
              <li>
                <Link to="/postcards/tiermotive" className="block py-3    ">
                  Tiermotive
                </Link>
              </li>
            </ul>
          </NavLink>
          <li
            className="relative group  "
          >
            <Link to="/aboutme" className="text-black tracking-wide ">
              Über mich
              <span className="linkspacer"></span>
            </Link>
          </li>
          <li className="relative group after:absolute after:left-0 after:w-full after:opacity-0 after:hover:scale-100 after:hover:opacity-100 ">
            <Link to="/stories" className="text-black tracking-wide">
              Stories
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mask overflow-hidden flex-grow-0 fixed right-0 top-90% sm:mr-calc lg:mr-2 z-50 mt-1">
        <svg
          onClick={handleScrollUp}
          ref={arrowNav}
          className="cursor-pointer bg-slate-500 hover:bg-slate-900 p-1 fill-white rounded-full text-white"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          viewBox="0 0 384 512"
        >
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </div>
    </>
  );
};

const ArrowDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="h-6 w-6 ml-2 inline"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export default Navbar;
