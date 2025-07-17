'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaCrown, FaSearch, FaEdit, FaTrash, FaArrowLeft, FaSpinner, FaCheck, FaTimes, FaSignOutAlt } from 'react-icons/fa'
import Link from 'next/link'
import imageCompression from 'browser-image-compression'
import { loadContent, addContentItem, updateContentItem, deleteContentItem, logout } from '@/lib/storage'

// Notification Component
const Notification = ({ message, type, onConfirm, onCancel, confirmText = "Yes", cancelText = "No" }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className={`flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4 ${
          type === 'success' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
        }`}>
          {type === 'success' ? <FaCheck className="text-xl" /> : <FaTimes className="text-xl" />}
        </div>
        <h3 className="text-lg font-medium text-center mb-4">{message}</h3>
        <div className="flex justify-center gap-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
              type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [content, setContent] = useState([])
  const [activeTab, setActiveTab] = useState('add-content')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: '--Select Category--',
    description: '',
    image: '',
    tags: '',
    isFeatured: false
  })
  const [editingId, setEditingId] = useState(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Notification states
  const [showNotification, setShowNotification] = useState(false)
  const [notificationConfig, setNotificationConfig] = useState({
    message: '',
    type: '',
    onConfirm: null,
    onCancel: null,
    confirmText: 'Yes',
    cancelText: 'No'
  })

  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('velure-auth')
    if (!auth) {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
      setContent(loadContent())
    }
  }, [router])

  const showConfirmDialog = (message, onConfirm, onCancel = null, type = 'confirm', confirmText = 'Yes', cancelText = 'No') => {
    setNotificationConfig({
      message,
      type,
      onConfirm: () => {
        onConfirm()
        setShowNotification(false)
      },
      onCancel: () => {
        if (onCancel) onCancel()
        setShowNotification(false)
      },
      confirmText,
      cancelText
    })
    setShowNotification(true)
  }

  const showAlert = (message, type = 'success', onClose = null) => {
    setNotificationConfig({
      message,
      type,
      onConfirm: () => {
        if (onClose) onClose()
        setShowNotification(false)
      },
      onCancel: null,
      confirmText: 'OK'
    })
    setShowNotification(true)
  }

  const handleLogout = () => {
    showConfirmDialog(
      'Are you sure you want to logout?',
      () => {
        logout()
        router.push('/login')
      },
      null,
      'confirm',
      'Logout',
      'Cancel'
    )
  }

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      fileType: 'image/webp'
    }
    try {
      setIsCompressing(true)
      return await imageCompression(file, options)
    } finally {
      setIsCompressing(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const compressedFile = await compressImage(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData({...formData, image: event.target.result})
      }
      reader.readAsDataURL(compressedFile)
    } catch (error) {
      showAlert('Error compressing image', 'error')
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.image) {
      showAlert('Please upload an image', 'error')
      return
    }

    showConfirmDialog(
      editingId ? 'Are you sure you want to update this content?' : 'Are you sure you want to add this content?',
      async () => {
        const contentData = {
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim())
        }

        try {
          const updatedContent = editingId
            ? await updateContentItem(editingId, contentData)
            : await addContentItem(contentData)
          
          setContent(updatedContent)
          // Reset form immediately after success
          setFormData({
            id: '',
            title: '',
            category: '--Select Category--',
            description: '',
            image: '',
            tags: '',
            isFeatured: false
          })
          setEditingId(null)
          showAlert(editingId ? 'Content updated successfully!' : 'Content added successfully!')
        } catch (error) {
          showAlert('Error saving content', 'error')
          console.error(error)
        }
      },
      null,
      'confirm',
      editingId ? 'Update' : 'Add'
    )
  }

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      image: item.image,
      tags: item.tags?.join(', ') || '',
      isFeatured: item.isFeatured || false
    })
    setEditingId(item.id)
    setActiveTab('add-content')
  }

  const handleDelete = (id) => {
    showConfirmDialog(
      'Are you sure you want to delete this item? This action cannot be undone.',
      async () => {
        try {
          const updatedContent = await deleteContentItem(id)
          setContent(updatedContent)
          showAlert('Content deleted successfully!')
        } catch (error) {
          showAlert('Error deleting content', 'error')
          console.error(error)
        }
      },
      null,
      'error',
      'Delete',
      'Cancel'
    )
  }

  const resetForm = () => {
    showConfirmDialog(
      'Are you sure you want to cancel editing? All unsaved changes will be lost.',
      () => {
        setFormData({
          id: '',
          title: '',
          category: '--Select Category--',
          description: '',
          image: '',
          tags: '',
          isFeatured: false
        })
        setEditingId(null)
      },
      null,
      'confirm',
      'Yes, Cancel',
      'No, Keep Editing'
    )
  }

  const filteredContent = content.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
    if (!searchTerm) return categoryMatch
    
    const searchLower = searchTerm.toLowerCase()
    const tagsString = item.tags?.join(' ') || ''
    
    return categoryMatch && (
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      tagsString.toLowerCase().includes(searchLower)
    )
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-amber-600 mx-auto mb-4" />
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Overlay */}
      {showNotification && (
        <Notification
          message={notificationConfig.message}
          type={notificationConfig.type}
          onConfirm={notificationConfig.onConfirm}
          onCancel={notificationConfig.onCancel}
          confirmText={notificationConfig.confirmText}
          cancelText={notificationConfig.cancelText}
        />
      )}

      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium relative ${activeTab === 'add-content' ? 'text-amber-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('add-content')}
            >
              {editingId ? 'Edit Content' : 'Add Content'}
              {activeTab === 'add-content' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-600"></span>
              )}
            </button>
            <button
              className={`px-6 py-3 font-medium relative ${activeTab === 'manage-content' ? 'text-amber-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('manage-content')}
            >
              Manage Content
              {activeTab === 'manage-content' && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-600"></span>
              )}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {activeTab === 'add-content' && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
                  required
                >
                  <option value="--Select Category--" disabled>--Select Category--</option>
                  <option value="featured">Featured</option>
                  <option value="trending">Trending</option>
                  <option value="wedding">Wedding</option>
                  <option value="culture">Culture</option>
                  <option value="beauty">Beauty</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
                required
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image *
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {formData.image ? (
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {isCompressing ? (
                        <FaSpinner className="w-8 h-8 mb-4 text-gray-500 animate-spin" />
                      ) : (
                        <>
                          <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG (MAX. 5MB)
                          </p>
                        </>
                      )}
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    required
                    disabled={isCompressing}
                  />
                </label>
              </div>
              {formData.image && (
                <button
                  type="button"
                  onClick={() => setFormData({...formData, image: ''})}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove Image
                </button>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
                placeholder="fashion, summer, trends"
              />
            </div>

            <div className="flex items-center mb-8">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Featured Content</label>
            </div>

            <div className="flex justify-end space-x-4">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm font-medium"
                disabled={isCompressing}
              >
                {isCompressing ? (
                  <span className="flex items-center">
                    <FaSpinner className="animate-spin mr-2" /> Processing...
                  </span>
                ) : editingId ? (
                  'Update Content'
                ) : (
                  'Add Content'
                )}
              </button>
            </div>
          </form>
        )}

        {activeTab === 'manage-content' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Manage Content</h2>
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="all">All Categories</option>
                  <option value="featured">Featured</option>
                  <option value="trending">Trending</option>
                  <option value="wedding">Wedding</option>
                  <option value="culture">Culture</option>
                  <option value="beauty">Beauty</option>
                </select>
                <div className="relative w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContent.length > 0 ? (
                    filteredContent.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={item.image} alt={item.title} className="h-12 w-12 rounded object-cover" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{item.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 capitalize">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.isFeatured ? (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              Featured
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                              Standard
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-amber-600 hover:text-amber-900 mr-4"
                          >
                            <FaEdit className="inline mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash className="inline mr-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        {searchTerm ? 'No matching content found' : 'No content available'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}