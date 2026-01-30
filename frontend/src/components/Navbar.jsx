import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'
import logo from '../assets/logo.svg'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src={logo} alt="Vibe Delivery" className="h-12 w-12"/>
            <span className="text-2xl font-bold text-neutral hidden sm:inline">Vibe Delivery</span>
          </Link>

          {/* Center Navigation - Hidden on mobile */}
          <ul className="menu menu-horizontal p-0 gap-1 hidden md:flex">
            <li><NavLink to="/" className="px-3 py-2 rounded">Home</NavLink></li>
            <li><a href="#features" className="px-3 py-2 rounded">Features</a></li>
            <li><a href="#how" className="px-3 py-2 rounded">How it Works</a></li>
            <li><a href="#contact" className="px-3 py-2 rounded">Contact</a></li>
          </ul>

          {/* Right side: Create Parcel + Theme + Auth */}
          <div className="flex items-center gap-3">
            {/* Create Parcel Button - Always visible */}
            <button 
              onClick={() => user ? navigate('/create-parcel') : navigate('/login')}
              className="btn btn-sm btn-accent hidden sm:flex gap-1"
              title={user ? "Create a new parcel" : "Login to create parcel"}
            >
              <span>📦</span>
              <span className="hidden md:inline">Create Parcel</span>
            </button>
            
            {/* Mobile Create Parcel Icon Button */}
            <button 
              onClick={() => user ? navigate('/create-parcel') : navigate('/login')}
              className="btn btn-sm btn-accent sm:hidden"
              title={user ? "Create parcel" : "Login to create parcel"}
            >
              📦
            </button>

            <ThemeToggle />
            
            {user ? (
              <div className="dropdown dropdown-end">
                <button className="btn btn-sm btn-ghost normal-case">
                  <span className="hidden sm:inline">{user.name || user.email}</span>
                  <span className="sm:hidden">👤</span>
                </button>
                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
                  <li><a href="#profile">Profile</a></li>
                  <li><a href="#orders">My Orders</a></li>
                  <li><button onClick={handleLogout} className="text-error">Logout</button></li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
                <Link to="/signup" className="btn btn-sm btn-primary">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
