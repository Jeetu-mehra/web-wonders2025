"use client"
import React, { useState, useEffect, useRef } from 'react'
import ContentGrid from '@/components/ContentGrid'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '@/components/footer'

const Wed = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const dropdownHandlers = useRef([])
  const exploreLinks = useRef([])

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

    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown')
    dropdownHandlers.current = []

    const handleMouseEnter = (dropdownContent) => {
      return () => {
        dropdownContent.classList.add('show')
      }
    }

    const handleMouseLeave = (dropdownContent) => {
      return () => {
        dropdownContent.classList.remove('show')
      }
    }

    dropdowns.forEach(dropdown => {
      const dropbtn = dropdown.querySelector('.dropbtn')
      const dropdownContent = dropdown.querySelector('.dropdown-content')

      if (!dropbtn || !dropdownContent) return

      const enterHandler = handleMouseEnter(dropdownContent)
      const leaveHandler = handleMouseLeave(dropdownContent)

      dropbtn.addEventListener('mouseenter', enterHandler)
      dropdown.addEventListener('mouseleave', leaveHandler)

      dropdownHandlers.current.push({
        dropbtn,
        dropdown,
        enterHandler,
        leaveHandler
      })
    })

    // Cleanup function
    return () => {
      exploreLinks.current.forEach(link => {
        link.removeEventListener('click', handleScroll)
      })
      
      dropdownHandlers.current.forEach(({ dropbtn, dropdown, enterHandler, leaveHandler }) => {
        dropbtn?.removeEventListener('mouseenter', enterHandler)
        dropdown?.removeEventListener('mouseleave', leaveHandler)
      })
      
      dropdownHandlers.current = []
      exploreLinks.current = []
    }
  }, [currentPage])

  return (
    <>
      <Head>
        <title>Traditional Collections</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Show banner only on first page */}
      {currentPage === 1 && (
        <header className="hero relative h-screen flex items-center justify-center text-center"
          style={{
            backgroundImage: "url('/siab/traditional.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          <div className="absolute inset-0 bg-black/40 z-[1]"></div>

          <div className="top-left absolute top-5 left-5 z-10 font-[montserrat]">
            <div className="dropdown relative inline-block">
              <button className="dropbtn bg-transparent text-white py-3 px-4 text-sm font-semibold border-none rounded cursor-pointer">
                CATEGORIES ▾
              </button>
              <div className="dropdown-content absolute hidden min-w-[250px] p-4 bg-gradient-to-b from-[#f0f0f0] to-[#ddd] rounded-xl shadow-lg z-50 opacity-0 translate-y-[-10px] transition-all duration-300 ease-in-out">
                <Link href="/trending" className="category-item flex items-center gap-3 mb-2.5 cursor-pointer transition-all duration-300 hover:bg-white/60 hover:rounded hover:p-1">
                  <img
                    src="/siab/tren.jpg"
                    alt="Trending"
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#333]">Trending</span>
                </Link>
                <Link href="/featured" className="category-item flex items-center gap-3 mb-2.5 cursor-pointer transition-all duration-300 hover:bg-white/60 hover:rounded hover:p-1">
                  <img
                    src="/siab/feat.jpg"
                    alt="Featured"
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#333]">Featured</span>
                </Link>
                <Link href="/wedding" className="category-item flex items-center gap-3 mb-2.5 cursor-pointer transition-all duration-300 hover:bg-white/60 hover:rounded hover:p-1">
                  <img
                    src="/siab/wedd.jpg"
                    alt="Wedding"
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#333]">Wedding</span>
                </Link>
                <Link href="/traditional" className="category-item flex items-center gap-3 mb-2.5 cursor-pointer transition-all duration-300 hover:bg-white/60 hover:rounded hover:p-1">
                  <img
                    src="/siab/trad.jpg"
                    alt="Traditional"
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#333]">Traditional</span>
                </Link>
                <Link href="/beauty" className="category-item flex items-center gap-3 mb-2.5 cursor-pointer transition-all duration-300 hover:bg-white/60 hover:rounded hover:p-1">
                  <img
                    src="/siab/beau.jpg"
                    alt="Beauty"
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <span className="font-semibold text-[#333]">Beauty</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-[999] max-w-[700px] px-5 w-full">
            <Link
              href="/home"
              className="nav-btn font-[montserrat] bg-white text-black py-2.5 px-5 rounded-full font-semibold cursor-pointer transition duration-300 hover:bg-transparent hover:text-white mb-4 inline-block"
              style={{
                animation: 'fadeIn 0.5s ease-out forwards',
                opacity: 0
              }}
            >
              Home
            </Link>

            <div className="my-6 w-full">
              <h1
                className="text-4xl md:text-6xl font-bold font-serif mx-auto relative"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  animation: 'slideIn 1s ease-out forwards',
                  opacity: 0
                }}
              >
                Traditional Collections
              </h1>
            </div>

            <p
              className="text-xl opacity-90 font-[montserrat] mb-6"
              style={{
                animation: 'fadeIn 1s ease-out forwards 0.3s',
                opacity: 0
              }}
            >
              Elegant designs for your special day
            </p>

            <Link
              href="#trending"
              className="nav-btn font-[montserrat] bg-white text-black py-2.5 px-5 rounded-full font-semibold cursor-pointer transition duration-300 hover:bg-transparent hover:text-white inline-block"
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
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <ContentGrid 
            category="culture" 
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
      `}</style>
    </>
  )
}

export default Wed