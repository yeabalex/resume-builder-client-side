import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="text-white py-12 px-6 border-t-2 border-gray-700">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <p className="text-lg font-bold mb-2">&copy; 2024 CVMeister. All rights reserved.</p>
                    <p className="text-sm">Elevate your professional presence and impress employers with ease!</p>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start mb-6 md:mb-0">
                    <a href="/privacy" className="text-white hover:text-gray-300 mx-4 text-base transition duration-300 ease-in-out">Privacy Policy</a>
                    <a href="/terms" className="text-white hover:text-gray-300 mx-4 text-base transition duration-300 ease-in-out">Terms of Service</a>
                </div>
                <div className="flex justify-center space-x-6">
                    <a href="https://facebook.com" className="text-white hover:text-blue-500 text-2xl transition duration-300 ease-in-out" aria-label="Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" className="text-white hover:text-blue-400 text-2xl transition duration-300 ease-in-out" aria-label="Twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://linkedin.com" className="text-white hover:text-blue-600 text-2xl transition duration-300 ease-in-out" aria-label="LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://instagram.com" className="text-white hover:text-pink-500 text-2xl transition duration-300 ease-in-out" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
