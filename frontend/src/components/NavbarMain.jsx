// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0 flex items-center">
//               <img className="h-10 w-auto" src="https://via.placeholder.com/40" alt="Diksha Foundation" />
//               <span className="text-white font-bold text-xl ml-2">Diksha Foundation</span>
//             </Link>
//           </div>
          
//           {/* Desktop menu */}
//           <div className="hidden md:flex md:items-center md:space-x-4">
//             <Link to="/" className="text-white hover:bg-orange-700 hover:text-white px-3 py-2 rounded-md font-medium">Home</Link>
//             <Link to="/about" className="text-white hover:bg-orange-700 hover:text-white px-3 py-2 rounded-md font-medium">About</Link>
//             <Link to="/programs" className="text-white hover:bg-orange-700 hover:text-white px-3 py-2 rounded-md font-medium">Programs</Link>
//             <Link to="/contact" className="text-white hover:bg-orange-700 hover:text-white px-3 py-2 rounded-md font-medium">Contact</Link>
//             <Link to="/donate" className="bg-white text-orange-600 hover:bg-orange-100 px-4 py-2 rounded-md font-medium ml-2">Donate</Link>
//             <Link to="/login" className="bg-blue-700 text-white hover:bg-blue-800 px-4 py-2 rounded-md font-medium ml-2">Login</Link>
//           </div>
          
//           {/* Mobile menu button */}
//           <div className="flex md:hidden items-center">
//             <button 
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-white hover:text-white focus:outline-none"
//             >
//               {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="md:hidden bg-orange-500">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <Link to="/" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-orange-700">Home</Link>
//             <Link to="/about" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-orange-700">About</Link>
//             <Link to="/programs" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-orange-700">Programs</Link>
//             <Link to="/contact" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-orange-700">Contact</Link>
//             <Link to="/donate" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-orange-700">Donate</Link>
//             <Link to="/login" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-orange-700">Login</Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logoImage from '../assets/logo.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-10 w-auto" src={logoImage}  alt="Diksha Foundation" />
              <span className="text-white font-bold text-xl ml-2">Diksha Foundation</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-white hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md font-medium">Home</Link>
            <Link to="/about" className="text-white hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md font-medium">About</Link>
            <Link to="/contact" className="text-white hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md font-medium">Contact</Link>
            <Link to="/donate" className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-md font-medium ml-2">Donate</Link>
            <Link to="/login" className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-md font-medium ml-2">Login</Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-blue-900">Home</Link>
            <Link to="/about" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-blue-900">About</Link>
            <Link to="/programs" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-blue-900">Programs</Link>
            <Link to="/contact" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-blue-900">Contact</Link>
            <Link to="/donate" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-blue-900">Donate</Link>
            <Link to="/login" className="text-white block px-3 py-2 rounded-md font-medium hover:bg-blue-900">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;