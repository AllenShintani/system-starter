'use client'

import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Home</h1>
        <button
          onClick={() => router.push('/')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          404ページへ
        </button>
      </div>
    </div>
  )
}

export default Home
