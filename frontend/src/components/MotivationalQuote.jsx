import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Quote, RefreshCw } from 'lucide-react'

const MotivationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const quotes = [
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      text: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela"
    },
    {
      text: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King"
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt"
    }
  ]

  const refreshQuote = () => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
      setIsLoading(false)
    }, 500)
  }

  // Auto-refresh quote weekly (for demo, we'll use a shorter interval)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 30000) // Change every 30 seconds for demo

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="bg-gradient-to-r from-primary-50 to-blue-50 p-4 rounded-lg border border-primary-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Quote className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Weekly Motivation</span>
          </div>
          
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <blockquote className="text-gray-700 italic text-sm leading-relaxed">
              "{quotes[currentQuote].text}"
            </blockquote>
            <cite className="text-xs text-gray-500 mt-2 block">
              — {quotes[currentQuote].author}
            </cite>
          </motion.div>
        </div>
        
        <motion.button
          onClick={refreshQuote}
          disabled={isLoading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="ml-3 p-2 text-primary-600 hover:bg-primary-100 rounded-full transition-colors disabled:opacity-50"
        >
          <RefreshCw 
            className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} 
          />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default MotivationalQuote
