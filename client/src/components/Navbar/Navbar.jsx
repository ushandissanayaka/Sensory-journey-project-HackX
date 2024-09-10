import { useState } from 'react';
import Logo from '../../assets/logo.png';
import { GrLanguage } from "react-icons/gr";
import { FaBars, FaXmark } from "react-icons/fa6";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { link: "Overview", Path: "Home" },
    { link: "Games", Path: "Games" },
    { link: "Doctors", Path: "Doctors" },
    { link: "Skill Centers", Path: "Skill Centers" },
  ];

  return (
    <>
      
      <nav
        className="bg-black md:px-14 py-0 px-5 max-w-[calc(100%-10px)] mx-auto text-white fixed top-5 right-5 left-5 z-50 rounded-full"
        style={{ height: '60px', backgroundColor: 'rgba(0, 0, 0, 0.3)' }} 
      >
        <div className="text-lg container mx-auto flex justify-between items-center h-full font-medium">
        
          <a href="/" className="">
            <img src={Logo} alt="Logo" className="w-10 inline-block" />
          </a>

       
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

          
          <div className="space-x-12 hidden md:flex items-center">
            <a href="/" className="hidden lg:flex items-center hover:text-gray-400 h-full">
              <GrLanguage className="mr-2" />
              <span>Language</span>
            </a>
            <button className="bg-white text-black py-2 px-4 transition-all duration-300 rounded-3xl hover:text-white hover:bg-indigo-600">
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
