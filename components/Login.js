'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaLock, FaUser } from 'react-icons/fa'
import Notification from './Notification'
// import { GET } from '@/app/api/contentForm/route'

// const validUsers = [
//     { id: 'U24AI032', password: 'Jeetu@123' },
//     { id: 'U24AI047', password: 'Param@123' },
//     { id: 'U24AI053', password: 'Akshaya@123' },
//     { id: 'U24AI048', password: 'FufaBadmash' }
// ]

export default function Login({ onLogin }) {
    const [credentials, setCredentials] = useState({ id: '', password: '' })
    const [showNotification, setShowNotification] = useState(false)
    const [notificationConfig, setNotificationConfig] = useState({
        message: '',
        type: 'error',
        onConfirm: null
    })
    const router = useRouter()

    //   const handleLogin = (e) => {
    //     e.preventDefault()
    //     const user = validUsers.find(
    //       u => u.id === credentials.id && u.password === credentials.password
    //     )
    async function handleLogin(e){
        e.preventDefault();
        const res = await fetch('api/user', { method: 'GET' });
        const data = await res.json();
        let allUser = data.allUser || [];
        const id=credentials.id;
        const password=credentials.password;

        const user = allUser.findOne({id, password})

        if (user) {
            localStorage.setItem('velure-auth', 'true')
            router.push('/admin')
        } else {
            setNotificationConfig({
                message: 'Authentication failed. Invalid ID or password.',
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
                <h1 className="text-3xl font-serif font-bold text-center mb-8">Admin Portal</h1>
                <form onSubmit={handleLogin} className="space-y-6">
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
                                placeholder="Enter your admin ID"
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
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}