'use client'
import { FaCheck, FaTimes } from 'react-icons/fa'

export default function Notification({ message, type, onConfirm, onCancel, confirmText = "Yes", cancelText = "No" }) {
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