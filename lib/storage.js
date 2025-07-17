// Content storage helper with localStorage
export const saveContent = (content) => {
  localStorage.setItem('velure-content', JSON.stringify(content))
}

export const loadContent = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('velure-content')
    return saved ? JSON.parse(saved) : []
  }
  return []
}

export const getContentByCategory = (category) => {
  const content = loadContent()
  return content.filter(item => item.category === category)
}

export const addContentItem = (newItem) => {
  const content = loadContent()
  const updated = [...content, {
    ...newItem,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  }]
  saveContent(updated)
  return updated
}

export const updateContentItem = (id, updatedItem) => {
  const content = loadContent()
  const updated = content.map(item =>
    item.id === id ? { ...item, ...updatedItem, updatedAt: new Date().toISOString() } : item
  )
  saveContent(updated)
  return updated
}

export const deleteContentItem = (id) => {
  const content = loadContent()
  const updated = content.filter(item => item.id !== id)
  saveContent(updated)
  return updated
}

// Authentication functions
export const checkAuth = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('velure-auth') === 'true'
  }
  return false
}

export const login = (id, password) => {
  // Predefined admin credentials
  const validUsers = [
    { id: 'U24AI032', password: 'Jeetu@123' },
  { id: 'U24AI047', password: 'Param@123' },
  { id: 'U24AI053', password: 'Akshaya@123' },
  { id: 'U24AI048', password: 'FufaBadmash' }
  ]

  const isValid = validUsers.some(user => 
    user.id === id && user.password === password
  )

  if (isValid && typeof window !== 'undefined') {
    localStorage.setItem('velure-auth', 'true')
    return true
  }
  return false
}

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('velure-auth')
  }
}

// Check if user is authenticated (for protected routes)
export const requireAuth = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('velure-auth') === 'true'
  }
  return false
}