import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from './button';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image from 'next/image';
import Link from 'next/link'

const NavbarMobile = (params: Params) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <nav className="w-full bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Image src={params.image} alt='Logo' width={50} height={50} className="" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="lg:hidden focus:outline-none"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-2xl text-gray-800" />
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-xl rounded-b-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-4 p-6">
              <Link href="/" className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
                Home
              </Link>
              <Link href="/about" className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
                About
              </Link>
              <Link href="/services" className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
                Services
              </Link>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                Log in
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavbarMobile;
