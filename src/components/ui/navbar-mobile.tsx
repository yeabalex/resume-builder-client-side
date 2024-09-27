import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { Button } from './button';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image from 'next/image';
import Link from 'next/link'
const NavbarMobile = (params : Params) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`p-4 w-full`}>
      <div className="flex items-center justify-between">
          <Image src={params.image} alt='' width={85} height={85}/>
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-neutral-700 dark:text-neutral-200 text-2xl" />
          </button>
        </div>
      </div>
      <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} mt-4 lg:mt-0 flex flex-col space-y-5`}>
        <a href="/" className="block px-2 py-1 text-neutral-700 dark:text-neutral-200 lg:inline-block lg:mt-0">
        Home
        </a>
        <a href="/about" className="block px-2 py-1 text-neutral-700 dark:text-neutral-200 lg:inline-block lg:mt-0">
        About
        </a>
        <a href="/settings" className="block px-2 py-1 text-neutral-700 dark:text-neutral-200 lg:inline-block lg:mt-0">
        Services
        </a>
        <div className='flex space-x-5'>
        <Button className='dark:bg-neutral-800' >Log in</Button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMobile;
