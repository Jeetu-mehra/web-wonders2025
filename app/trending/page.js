"use client"
import React, { useState, useEffect, useRef } from 'react'
import ContentGrid from '@/components/ContentGrid'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '@/components/footer'

const tren = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const exploreLinks = useRef([])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Setup scroll reveal effect (runs once)
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal")
    const revealOnScroll = () => {
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight
        const revealTop = reveals[i].getBoundingClientRect().top
        const revealPoint = 150

        if (revealTop < windowHeight - revealPoint) {
          reveals[i].classList.add("visible")
        }
      }
    }

    window.addEventListener("scroll", revealOnScroll)
    revealOnScroll()

    return () => {
      window.removeEventListener("scroll", revealOnScroll)
    }
  }, [])

  // Setup hero banner event listeners (runs when banner mounts)
  useEffect(() => {
    if (currentPage !== 1) return

    // Smooth scroll to section
    const handleScroll = (e) => {
      e.preventDefault()
      const targetId = e.currentTarget.getAttribute('href')
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        })
      }
    }

    // Get fresh references to elements
    exploreLinks.current = document.querySelectorAll('a[href="#trending"]')
    exploreLinks.current.forEach(link => {
      link.addEventListener('click', handleScroll)
    })

    // Cleanup function
    return () => {
      exploreLinks.current.forEach(link => {
        link.removeEventListener('click', handleScroll)
      })
      exploreLinks.current = []
    }
  }, [currentPage])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <>
      <Head>
        <title>Trending Collections</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Show banner only on first page */}
      {currentPage === 1 && (
        <header className="hero relative h-screen flex items-center justify-center text-center"
          style={{
            backgroundImage: "url('/siab/trending.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          <div className="absolute inset-0 bg-black/40 z-[1]"></div>

          <div className="top-left absolute top-4 md:top-5 left-4 md:left-5 z-10 font-[montserrat]" ref={dropdownRef}>
            <div className="dropdown relative inline-block">
              <button 
                className="dropbtn bg-transparent text-white py-2 px-3 md:py-3 md:px-4 text-xs sm:text-sm font-semibold border-none rounded cursor-pointer flex items-center gap-1"
                onClick={toggleDropdown}
                onMouseEnter={() => window.innerWidth > 768 && setIsDropdownOpen(true)}
              >
                CATEGORIES <span className="text-xs">{isDropdownOpen ? '▴' : '▾'}</span>
              </button>
              <div 
                className={`dropdown-content ${isDropdownOpen ? 'show' : ''} absolute left-0 mt-1 min-w-[160px] sm:min-w-[180px] md:min-w-[220px] lg:min-w-[250px] p-2 sm:p-3 md:p-4 bg-gradient-to-b from-[#f0f0f0] to-[#ddd] rounded-xl shadow-lg z-50 transition-all duration-300 ease-in-out`}
                onMouseLeave={() => window.innerWidth > 768 && setIsDropdownOpen(false)}
              >
                <Link href="/trending" className="category-item flex items-center gap-2 sm:gap-3 mb-2 sm:mb-2.5 cursor-pointer transition-all duration-300 hover:bg-white/60 hover:rounded hover:p-1">
                  <img
                    src="/siab/tren.jpg"
                    alt="Trending"
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#333] text-xs sm:text-sm md:text-base">Trending</span>
                </Link>
                <Link href="/featured" className="category-item flex items-center gap-2 sm:gap-3 mb-2 sm:mb-2.5 cursor-pointer transition-all duration-300 hover:bg-white/60 hover:rounded hover:p-1">
                  <img
                    src="/siab/feat.jpg"
                    alt="Featured"
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#333] text-xs sm:text-sm md:text-base">Featured</span>
                </Link>
                <Link href="/wedding" className="category-item flex items-center gap-2 sm:gap-3 mb-2 sm:mb-2.5 cursor-pointer transition-all duration-300 hover:bg-white/60 hover:rounded hover:p-1">
                  <img
                    src="/siab/wedd.jpg"
                    alt="Wedding"
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#333] text-xs sm:text-sm md:text-base">Wedding</span>
                </Link>
                <Link href="/traditional" className="category-item flex items-center gap-2 sm:gap-3 mb-2 sm:mb-2.5 cursor-pointer transition-all duration-300 hover:bg-white/60 hover:rounded hover:p-1">
                  <img
                    src="/siab/trad.jpg"
                    alt="Traditional"
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#333] text-xs sm:text-sm md:text-base">Traditional</span>
                </Link>
                <Link href="/beauty" className="category-item flex items-center gap-2 sm:gap-3 mb-2 sm:mb-2.5 cursor-pointer transition-all duration-300 hover:bg-white/60 hover:rounded hover:p-1">
                  <img
                    src="/siab/beau.jpg"
                    alt="Beauty"
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#333] text-xs sm:text-sm md:text-base">Beauty</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 w-[90%] max-w-[700px] px-4">
            <Link
              href="/home"
              className="nav-btn font-[montserrat] bg-white text-black py-2 px-4 sm:py-2.5 sm:px-5 text-sm sm:text-base rounded-full font-semibold cursor-pointer transition duration-300 hover:bg-transparent hover:text-white mb-3 sm:mb-4 inline-block"
              style={{
                animation: 'fadeIn 0.5s ease-out forwards',
                opacity: 0
              }}
            >
              Home
            </Link>

            <div className="my-4 sm:my-6 w-full">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif mx-auto relative"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  animation: 'slideIn 1s ease-out forwards',
                  opacity: 0
                }}
              >
                Trending Collections
              </h1>
            </div>

            <p
              className="text-sm sm:text-base md:text-xl opacity-90 font-[montserrat] mb-4 sm:mb-6"
              style={{
                animation: 'fadeIn 1s ease-out forwards 0.3s',
                opacity: 0
              }}
            >
              Elegant designs for your special day
            </p>

            <Link
              href="#trending"
              className="nav-btn font-[montserrat] bg-white text-black py-2 px-4 sm:py-2.5 sm:px-5 text-sm sm:text-base rounded-full font-semibold cursor-pointer transition duration-300 hover:bg-transparent hover:text-white inline-block"
              style={{
                animation: 'fadeIn 1s ease-out forwards 0.6s',
                opacity: 0
              }}
            >
              Explore Now
            </Link>
          </div>
        </header>
      )}

      {/* Content Grid Section */}
      <div id="trending" className="min-h-screen bg-gradient-to-br from-white to-[#f5deb3]">
        <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <ContentGrid 
            category="trending" 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={currentPage === 1 ? 3 : 9}
          />
        </div>
      </div>
      <Footer />

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateY(-40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-content {
          display: none;
          opacity: 0;
          transform: translateY(-10px);
        }

        .dropdown-content.show {
          display: block;
          opacity: 1;
          transform: translateY(0);
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        html {
          scroll-behavior: smooth;
        }

        .hero-text *[style*="animation"] {
          animation-fill-mode: forwards !important;
        }

        /* Fix for modal z-index */
        .modal-overlay {
          z-index: 1000 !important;
        }
        
        .modal-content {
          z-index: 1001 !important;
        }

        /* Responsive dropdown styles */
        /* Mobile (default) - up to 640px */
        .dropbtn {
          font-size: 0.75rem; /* 12px */
          padding: 0.5rem 0.75rem; /* 8px 12px */
        }

        .dropdown-content {
          min-width: 160px;
          padding: 0.5rem;
        }

        .category-item img {
          width: 1.5rem; /* 24px */
          height: 1.5rem;
        }

        .category-item span {
          font-size: 0.75rem; /* 12px */
        }

        /* Small tablets - 641px to 768px */
        @media (min-width: 641px) {
          .dropbtn {
            font-size: 0.875rem; /* 14px */
            padding: 0.625rem 1rem; /* 10px 16px */
          }

          .dropdown-content {
            min-width: 180px;
            padding: 0.75rem;
          }

          .category-item img {
            width: 2rem; /* 32px */
            height: 2rem;
          }

          .category-item span {
            font-size: 0.875rem; /* 14px */
          }
        }

        /* Tablets - 769px to 1024px */
        @media (min-width: 769px) {
          .dropdown-content {
            min-width: 220px;
            padding: 1rem;
          }

          .category-item img {
            width: 2.5rem; /* 40px */
            height: 2.5rem;
          }
        }

        /* Desktop - 1025px and up */
        @media (min-width: 1025px) {
          .dropdown-content {
            min-width: 250px;
          }

          .category-item span {
            font-size: 1rem; /* 16px */
          }
        }

        /* Desktop hover effects */
        @media (min-width: 769px) {
          .dropdown:hover .dropdown-content {
            display: block;
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Ensure proper spacing on all devices */
        .hero-text {
          margin-top: 2rem; /* 32px */
          width: 90%;
        }

        @media (min-width: 641px) {
          .hero-text {
            margin-top: 0;
          }
        }
      `}</style>
    </>
  )
}

export default tren