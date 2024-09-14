import { useState } from 'react';
import Logo from '../../assets/logo.png';
import { GrLanguage } from "react-icons/gr";
import { FaBars, FaXmark } from "react-icons/fa6";
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { link: "Home", Path: "Home" },
    { link: "Games", Path: "Games" },
    { link: "Doctors", Path: "Doctors" },
    { link: "Skill Centers", Path: "Skill Centers" },
  ];

  return (
    <>
      <nav
        className="bg-black py-0 px-5 md:px-14 max-w-[calc(100%-20px)] mx-auto text-white fixed top-5 left-0 right-0 z-50 rounded-full navbar-container"
        style={{ height: '60px', backgroundColor: 'rgba(0, 0, 0, 0.3)', marginTop: "25px" }}
      >
        <div className="container mx-auto flex justify-between items-center h-full font-medium">
          {/* Logo */}
          <a href="/" className="">
            <img src={Logo} alt="Logo" className="w-10 inline-block" />
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-12">
            {navItems.map(({ link, Path }) => (
              <a
                key={link}
                href={Path}
                className="block hover:text-gray-400 h-full flex items-center"
              >
                {link}
              </a>
            ))}
          </ul>

          {/* Desktop Language and Sign up */}
          <div className="space-x-12 hidden md:flex items-center">
            <a href="/" className="hidden lg:flex items-center hover:text-gray-400 h-full">
              <GrLanguage className="mr-2" />
              <span>Language</span>
            </a>
            <button className="bg-white text-black py-2 px-4 transition-all duration-300 rounded-3xl hover:text-white hover:bg-purple-400">
              Sign up
            </button>
          </div>

          {/* Mobile Menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white text-lg focus:outline-none focus:text-gray-300"
            >
              {isMenuOpen ? (
                <FaXmark className="w-6 h-6 text-primary" />
              ) : (
                <FaBars className="w-6 h-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`space-y-4 px-5 pt-24 pb-5 bg-secondary text-xl ${
          isMenuOpen ? 'block fixed top-0 right-0 left-0' : 'hidden'
        }`}
      >
        {navItems.map(({ link, Path }) => (
          <a key={link} href={Path} className="block hover:text-gray-300">
            {link}
          </a>
        ))}
      </div>
    </>
  );
}

export default Navbar;
