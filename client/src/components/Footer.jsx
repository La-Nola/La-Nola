import React from "react";
import { Link } from "react-router-dom";
import {BiLogoGmail } from "react-icons/bi";
// LOgo
import logo from "../assets/img/la-nola-logo-petrol-1_2_m0wusi.png";

const Footer = () => {
    return (
<footer className="bg-footerClr2 mt-auto">
    <div className="mx-auto w-full max-w-screen-2xl">
      <div className="grid grid-cols-none text-center md:text-start gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
        <div>
            <img src={logo} alt="website logo" className="h-18 w-24 mb-4 md:ml-3 mx-auto"/>
            <h3 className="mb-6 text-sm font-semibold text-gray-500 uppercase  pl-1">Mit uns verbinden</h3>
            <div className="flex mt-4 md:space-x-5 space-x-11 md:mt-0 justify-center md:justify-start">
            <a href="https://www.facebook.com/lanokerzen/" className="text-gray-400 hover:text-gray-900 ">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                    <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
                </svg>
                <span className="sr-only">Facebook page</span>
            </a>
            <a href="https://www.instagram.com/la.nola.de/" className="text-gray-400 hover:text-gray-900 ">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="sr-only">Instagram Account</span>
            </a>
            <a href="http://twitter.com/share?text=la-nola.de&url=https%3A%2F%2Fwww.la-nola.de%2F" className="text-gray-400 hover:text-gray-900 ">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd"/>
                </svg>
                <span className="sr-only">Twitter-Seite</span>
            </a>
            <a href="mailto:?subject=la-nola.de&body=https://www.la-nola.de" className="text-gray-400 hover:text-gray-900 ">
              
               <BiLogoGmail className="pointer-events-none h-6 w-6"/>
                <span className="sr-only">Gmail</span>
            </a>
        </div>
        </div>
        <div>
            <h2 className="mb-6 md:text-base font-semibold text-gray-900 uppercase ">Über uns</h2>
            <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                    <Link to={'/stories'} className="hover:underline">Unsere Story</Link>
                </li>
                <li>
                    <Link className="hover:underline" to={'/team'}>Das Entwicklerteam</Link>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 md:text-base font-semibold text-gray-900 uppercase ">Shop</h2>
            <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                    <Link to={'/kidsclothes'} className="hover:underline">Klamotten</Link>
                </li>
                <li className="mb-4">
                    <Link to={'/postcards'} className="hover:underline">Postkarten</Link>
                </li>
                <li className="mb-4">
                    <Link to={'/candles'} className="hover:underline">Kerzen</Link>
                </li>
                <li className="mb-4">
                    <Link to={'/kidsclothes/new-collection'} className="hover:underline">Neue Kollektion</Link>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 md:text-base font-semibold text-gray-900 uppercase ">Anmelden</h2>
            <p className="text-gray-500">Melden Sie sich an, um Updates, Zugang zu exklusiven Angeboten und mehr zu erhalten.</p>

            <form action="">
                <input className="border-2 border-black p-2 w-full" type="text" placeholder="Geben Sie Ihre E-Mail Adresse ein"/>
                <Link to="/signup">
                <button type="submit" className="mt-4 border-black p-2 md:w-40 text-white bg-secondary w-full hover:bg-opacity-90">Anmelden</button>
                </Link>
            </form>
        </div>
    </div>
    <p className="text-gray-700 text-center">
          © {new Date().getFullYear()} All Rights Reserved. La-Nola developer
          team.{" "}
        </p>
        <br />
        <p className="font-semibold text-red-600 text-[0.8rem] text-center mb-2">
          This webpage is created for educational and learning purposes only. It
          is not intended for public usage or for e-commerce activities. Any
          unauthorized use, reproduction, or distribution of the content or
          design of this webpage is strictly prohibited.
        </p>
    </div>
</footer>
    )
};
export default Footer;