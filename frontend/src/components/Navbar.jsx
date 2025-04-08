import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="bg-white text-black">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-gray-700">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/kelp">Kelp</Link></li>
              <li><Link to="/sea-urchins">Sea Urchins</Link></li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <img src="/src/assets/logo.png" alt="KelpKeepers Logo" className="w-8 h-8 mr-2" />
            KelpKeepers
          </Link>
        </div>
        
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/kelp">Kelp</Link></li>
            <li><Link to="/sea-urchins">Sea Urchins</Link></li>
          </ul>
          <Link to="/login" className="btn btn-ghost">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar