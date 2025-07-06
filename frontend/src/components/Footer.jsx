import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Diksha Foundation</h3>
            <p className="text-blue-100 mb-4">Empowering children from marginalized communities through holistic education.</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="text-blue-100 hover:text-white" aria-label="Facebook">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-blue-100 hover:text-white" aria-label="Twitter">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-blue-100 hover:text-white" aria-label="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-blue-100 hover:text-white" aria-label="LinkedIn">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-100 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-blue-100 hover:text-white">About Us</Link></li>
              <li><Link to="/programs" className="text-blue-100 hover:text-white">Programs</Link></li>
              <li><Link to="/donate" className="text-blue-100 hover:text-white">Donate</Link></li>
              <li><Link to="/contact" className="text-blue-100 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span className="text-blue-100">123 Education Lane, Patna, Bihar, India</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <a href="tel:+919876543210" className="text-blue-100 hover:text-white">+91 98765 43210</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a href="mailto:info@dikshafoundation.org" className="text-blue-100 hover:text-white">info@dikshafoundation.org</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="text-blue-100 mb-4">Subscribe to our newsletter</p>
            <form className="flex flex-col md:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded text-gray-800 focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-blue-700 mt-10 pt-6 text-center">
          <p className="text-blue-200">&copy; {new Date().getFullYear()} Diksha Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;