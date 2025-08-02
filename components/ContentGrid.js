'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function ContentGrid({ category, currentPage, setCurrentPage, itemsPerPage }) {
  const [content, setContent] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  // Function to preserve newlines and whitespace in description
  const preserveFormatting = (text) => {
    if (!text) return ''
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await fetch('/api/contentForm')
        if (!res.ok) {
          throw new Error(`Failed to fetch content: ${res.statusText}`)
        }
        const data = await res.json()
        console.log('ContentGrid fetched content:', data)

        let filtered = data
        if (category && category !== 'all') {
          filtered = data.filter(item => item.category === category)
        }

        setContent(filtered)
      } catch (err) {
        console.error("Error fetching content:", err)
        setContent([])
      }
    }

    loadContent()
  }, [category])

  // Calculate total items and pages
  const totalItems = content.length
  const firstPageItems = 3
  const subsequentPageItems = itemsPerPage || 9
  const totalPages = Math.ceil((totalItems - firstPageItems) / subsequentPageItems) + 1

  // Calculate items to show
  const getItemsToShow = () => {
    if (currentPage === 1) {
      return content.slice(0, firstPageItems)
    } else {
      const startIndex = firstPageItems + (currentPage - 2) * subsequentPageItems
      return content.slice(startIndex, startIndex + subsequentPageItems)
    }
  }

  const currentItems = getItemsToShow()

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat&display=swap" rel="stylesheet" />
      </Head>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map((item, index) => (
          <div 
            key={item._id}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-[400px] opacity-0 translate-y-8 animate-fadeIn"
            style={{
              animationFillMode: 'forwards',
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => setSelectedItem(item)}
          >
            <div className="h-full w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg'
                }}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-6 transform translate-y-full transition-all duration-500 ease-in-out group-hover:translate-y-0">
              <h3 className="text-xl font-medium mb-2 font-['Montserrat']">{item.tags}</h3>
              <p className="text-l opacity-90 font-sans">{item.title}</p>
              {/* <p className="text-sm opacity-90 font-sans" style={{ whiteSpace: 'pre-wrap' }}>
                {preserveFormatting(item.description)}
              </p> */}
              {/* {item.isFeatured && (
                <span className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-['Montserrat']">
                  Featured
                </span>
              )} */}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2 font-['Montserrat']">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            &lt;
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === pageNum ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {pageNum}
              </button>
            )
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="flex items-end px-2">...</span>
          )}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300"
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            &gt;
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 animate-zoomIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-gradient-to-br from-white bg-[#f5deb3] rounded-xl max-w-4xl w-[90%] max-h-[90vh] overflow-y-auto flex flex-col md:flex-row p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="fixed md:absolute top-4 md:top-2 right-4 text-amber-100 md:text-gray-500 hover:text-black text-3xl z-10"
              onClick={() => setSelectedItem(null)}
            >
              &times;
            </button>

            <div className="w-full md:w-1/3 flex-shrink-0 overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            <div className="flex-1 md:pl-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold font-['Playfair_Display']">{selectedItem.title}</h3>
              </div>

              <p className="text-gray-600 mb-4 font-medium font-['Montserrat']" style={{ whiteSpace: 'pre-wrap' }}>
                {preserveFormatting(selectedItem.description)}
              </p>
            </div>
          </div>
        </div>
      )}

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
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes zoomIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-slideIn {
          animation: slideIn 1s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
        }
        
        .animate-zoomIn {
          animation: zoomIn 0.3s ease-out forwards;
        }

        .font-['Playfair_Display'] {
          font-family: 'Playfair Display', serif;
        }
        
        .font-['Montserrat'] {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </>
  )
}