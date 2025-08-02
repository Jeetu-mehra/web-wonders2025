"use client"
import React, { useState } from 'react'
import { FaChevronDown, FaSearch, FaHome, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      name: 'Trending',
      id: 'trending',
      image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Featured',
      id: 'featured',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Wedding',
      id: 'wedding',
      image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Traditional',
      id: 'traditional',
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Beauty',
      id: 'beauty',
      image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    }
  ]

  return (
    <header className="bg-white fixed w-full top-0 z-50 shadow-md py-4 transition-all">
      <div className="flex justify-between items-center max-w-[1400px] mx-auto px-10">
        {/* Left side with categories dropdown */}
        <div className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}>
          <button className="bg-transparent border-none font-sans text-base font-semibold uppercase tracking-wider cursor-pointer px-4 py-2 transition-all hover:bg-gray-100">
            Categories <FaChevronDown className="ml-2 inline" />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-[500px] bg-gradient-to-b from-white to-gray-500 shadow-xl rounded-b-lg py-5 transition-all">
              <div className="text-center pb-4 mb-4 border-b border-gray-200">
                <h3 className="font-serif text-2xl font-bold">Have Your Type</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-5 px-5">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/${category.id}`}
                    className="flex flex-col items-center cursor-pointer w-[120px] transition-all hover:-translate-y-1"
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      className="w-[100px] h-[100px] object-cover mb-2 rounded-full border-2 border-gray-200 transition-all hover:border-amber-600"
                    />
                    <span className="text-sm font-semibold text-center">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center logo */}
        <div  className="font-serif text-3xl font-black tracking-wider text-black relative">
          VELURE
          <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-amber-600 origin-right scale-x-0 transition-transform duration-400 hover:scale-x-100 hover:origin-left"></span>
        </div>

        {/* Right side navigation buttons */}
        <div className="flex items-center gap-5">
          <button
            className="bg-transparent border-none text-lg cursor-pointer w-10 h-10 flex items-center justify-center rounded-full transition-all hover:bg-gray-100"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <FaSearch />
          </button>
          <Link href="/" className="bg-transparent border-none text-lg cursor-pointer w-10 h-10 flex items-center justify-center rounded-full transition-all hover:bg-gray-100">
            <FaHome />
          </Link>
        </div>

        {/* Search container */}
        {isSearchOpen && (
          <div className="absolute top-full right-10 w-[400px] bg-white shadow-lg py-5 px-5 rounded-lg flex items-center transition-all">
            <input
              type="text"
              placeholder="Search for articles, trends, styles..."
              className="flex-1 py-3 px-4 border border-gray-300 rounded font-sans text-base outline-none pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="absolute right-9 text-gray-500 hover:text-black transition-colors"
              onClick={() => setIsSearchOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar