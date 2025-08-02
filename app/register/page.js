'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaLock, FaUser } from 'react-icons/fa'
import Notification from '@/components/Notification'

export default function Register() {
  const [credentials, setCredentials] = useState({ id: '', password: '' })
  const [showNotification, setShowNotification] = useState(false)
  const [notificationConfig, setNotificationConfig] = useState({
    message: '',
    type: 'error',
    onConfirm: null
  })
  const router = useRouter()

  async function handleRegister(e) {
    e.preventDefault()

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: credentials.id,
          password: credentials.password
        })
      })

      const data = await res.json()
      if (res.ok) {
        setNotificationConfig({
          message: 'User created successfully! You can now log in.',
          type: 'success',
          onConfirm: () => {
            setShowNotification(false)
            router.push('/login')
          }
        })
        setShowNotification(true)
      } else {
        setNotificationConfig({
          message: data.error || 'Failed to create user.',
          type: 'error',
          onConfirm: () => setShowNotification(false)
        })
        setShowNotification(true)
      }
    } catch (err) {
      console.error('Registration error:', err)
      setNotificationConfig({
        message: 'An error occurred during registration. Please try again.',
        type: 'error',
        onConfirm: () => setShowNotification(false)
      })
      setShowNotification(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {showNotification && (
        <Notification
          message={notificationConfig.message}
          type={notificationConfig.type}
          onConfirm={notificationConfig.onConfirm}
          confirmText="OK"
        />
      )}

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-serif font-bold text-center mb-8">Register</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
              Admin ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="id"
                value={credentials.id}
                onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
                required
                placeholder="Choose an admin ID"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
                required
                placeholder="Choose a password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Register
            </button>
          </div>

          {/* <div className="text-center">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-sm text-amber-600 hover:text-amber-800"
            >
              Already have an account? Log in here
            </button>
          </div> */}
        </form>
      </div>
    </div>
  )
}