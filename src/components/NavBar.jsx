import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-800 via-gray-800 to-black p-4 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-extrabold tracking-wider text-white">
          <Link to="/home" className="hover:underline">RPG Game</Link>
        </div>
        <div className="flex space-x-6 text-lg text-white">
          <Link to="/" className="hover:underline transition-all">Home</Link>
          <Link to="/character" className="hover:underline transition-all">Character</Link>
          <Link to="/battle" className="hover:underline transition-all">Battle</Link>
          <Link to="/shop" className="hover:underline transition-all">Shop</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
