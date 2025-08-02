// 'use client'
// import { useState, useEffect } from 'react'
// import { loadContent } from '@/lib/storage'

// export default function ContentDisplay() {
//   const [content, setContent] = useState([])
//   const [hoveredItem, setHoveredItem] = useState(null)

//   useEffect(() => {
//     setContent(loadContent())
//     const handleStorageChange = () => setContent(loadContent())
//     window.addEventListener('storage', handleStorageChange)
//     return () => window.removeEventListener('storage', handleStorageChange)
//   }, [])

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12 relative">
//       {/* Main Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {content.map((item) => (
//           <div
//             key={item.id}
//             className={`relative transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] 
//               ${hoveredItem === item.id ? 
//                 'fixed inset-0 z-50 flex items-center justify-center p-8 bg-black bg-opacity-90' : 
//                 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer'}`}
//             onMouseEnter={() => setHoveredItem(item.id)}
//             onMouseLeave={() => setHoveredItem(null)}
//           >
//             {hoveredItem === item.id ? (
//               /* Expanded View */
//               <div className="w-full max-w-6xl h-[80vh] bg-white rounded-2xl overflow-hidden flex flex-col lg:flex-row">
//                 {/* Text Content (Left) */}
//                 <div className="lg:w-1/2 p-8 overflow-y-auto">
//                   <div className="flex justify-between items-start mb-6">
//                     <h2 className="text-3xl font-serif font-bold">{item.title}</h2>
//                     <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
//                       {item.category}
//                     </span>
//                   </div>
//                   <p className="text-gray-700 mb-6 leading-relaxed">{item.description}</p>
//                   <div className="flex flex-wrap gap-2">
//                     {item.tags?.map((tag, i) => (
//                       <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Image (Right) */}
//                 <div className="lg:w-1/2 h-full bg-gray-100">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-contain object-center"
//                   />
//                 </div>
//               </div>
//             ) : (
//               /* Compact View */
//               <>
//                 <div className="aspect-square overflow-hidden">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-serif text-xl font-bold mb-1">{item.title}</h3>
//                   <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
//                   <div className="flex justify-between items-center mt-3">
//                     <span className="text-xs text-amber-600">{item.category}</span>
//                     {item.isFeatured && (
//                       <span className="text-xs bg-amber-600 text-white px-2 py-1 rounded-full">
//                         Featured
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }