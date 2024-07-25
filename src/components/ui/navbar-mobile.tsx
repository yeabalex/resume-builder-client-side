import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { Button } from './button';

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`p-4 w-full`}>
      <div className="flex items-center justify-between">
        <p className="text-white font-bold">CVMeister</p>
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-white text-2xl" />
          </button>
        </div>
      </div>
      <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} mt-4 lg:mt-0 flex flex-col space-y-5`}>
        <a href="/" className="block px-2 py-1 text-white lg:inline-block lg:mt-0">
        Home
        </a>
        <a href="/about" className="block px-2 py-1 text-white lg:inline-block lg:mt-0">
        About
        </a>
        <a href="/settings" className="block px-2 py-1 text-white lg:inline-block lg:mt-0">
        Services
        </a>
        <div className='flex space-x-5'>
        <Button variant="outline" className='text-white' >Log in</Button>
    
        <Button variant="secondary">Sign up</Button>
        
        </div>
      </div>
    </nav>
  );
};

export default NavbarMobile;
