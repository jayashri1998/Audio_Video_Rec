import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold">🎙️📹</span>
        <span className="text-xl font-semibold">AudioVideo Recorder</span>
      </div>
      <nav role="navigation">
        <NavLink 
          to="/" 
          className={({ isActive }) =>
            `mr-4 hover:underline ${isActive ? 'text-yellow-400' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/recordings" 
          className={({ isActive }) =>
            `hover:underline ${isActive ? 'text-yellow-400' : ''}`
          }
        >
          List of Recordings
        </NavLink>
      </nav>
    </header>
  );
}
