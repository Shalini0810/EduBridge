import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, ExternalLink, Clock, Eye, ChevronDown, ChevronUp, Heart, Brain, Target, Star, Sparkles, Users } from 'lucide-react'

const YouTubeResources = () => {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [activeTab, setActiveTab] = useState('dalai-lama')

  // Holistic Development Resources organized by category
  const resourceCategories = {
    'dalai-lama': {
      name: 'Dalai Lama Wisdom',
      icon: Heart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      videos: [
        {
          id: 1,
          title: 'The Art of Happiness - Dalai Lama\'s Complete Guide',
          description: 'Transform your life with ancient wisdom on finding true happiness through compassion',
          thumbnail: 'https://img.youtube.com/vi/vlwmfiCb-vc/maxresdefault.jpg',
          videoId: 'vlwmfiCb-vc',
          duration: '24:15',
          views: '2.1M',
          difficulty: 'Beginner'
        },
        {
          id: 2,
          title: 'Dalai Lama on Compassion and Inner Peace',
          description: 'Powerful teachings on developing compassion and finding inner tranquility',
          thumbnail: 'https://img.youtube.com/vi/36xZsgZ0oSo/maxresdefault.jpg',
          videoId: '36xZsgZ0oSo',
          duration: '18:20',
          views: '1.8M',
          difficulty: 'Intermediate'
        },
        {
          id: 3,
          title: 'How to Practice Kindness - Dalai Lama\'s Daily Wisdom',
          description: 'Simple yet profound practices for cultivating kindness in everyday life',
          thumbnail: 'https://img.youtube.com/vi/j3YjeARuilI/maxresdefault.jpg',
          videoId: 'j3YjeARuilI',
          duration: '15:45',
          views: '950K',
          difficulty: 'Beginner'
        },
        {
          id: 4,
          title: 'Dalai Lama\'s Secret to Mental Strength',
          description: 'Discover ancient Tibetan practices for building unshakeable mental resilience',
          thumbnail: 'https://img.youtube.com/vi/Aw5nC4w5gf0/maxresdefault.jpg',
          videoId: 'Aw5nC4w5gf0',
          duration: '22:30',
          views: '1.2M',
          difficulty: 'Advanced'
        }
      ]
    },
    'confidence': {
      name: 'Confidence & Self-Esteem',
      icon: Star,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      videos: [
        {
          id: 5,
          title: '10 Ways to Build Unshakable Confidence',
          description: 'Proven strategies to boost your self-confidence and overcome self-doubt',
          thumbnail: 'https://img.youtube.com/vi/w-HYZv6HzAs/maxresdefault.jpg',
          videoId: 'w-HYZv6HzAs',
          duration: '16:42',
          views: '3.2M',
          difficulty: 'Beginner'
        },
        {
          id: 6,
          title: 'The Science of Self-Confidence',
          description: 'Understanding the psychology behind confidence and how to develop it',
          thumbnail: 'https://img.youtube.com/vi/ZwEquW_Yij0/maxresdefault.jpg',
          videoId: 'ZwEquW_Yij0',
          duration: '12:18',
          views: '2.5M',
          difficulty: 'Intermediate'
        },
        {
          id: 7,
          title: 'Body Language Secrets for Instant Confidence',
          description: 'Master the art of confident body language and transform how others see you',
          thumbnail: 'https://img.youtube.com/vi/Ks-_Mh1QhMc/maxresdefault.jpg',
          videoId: 'Ks-_Mh1QhMc',
          duration: '14:25',
          views: '1.9M',
          difficulty: 'Beginner'
        },
        {
          id: 8,
          title: 'Overcoming Social Anxiety - Teen Edition',
          description: 'Practical tips for students to overcome social fears and build connections',
          thumbnail: 'https://img.youtube.com/vi/o268qbb_0BM/maxresdefault.jpg',
          videoId: 'o268qbb_0BM',
          duration: '19:30',
          views: '1.4M',
          difficulty: 'Beginner'
        }
      ]
    },
    'emotional-intelligence': {
      name: 'Emotional Intelligence',
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      videos: [
        {
          id: 9,
          title: 'Emotional Intelligence Explained',
          description: 'Master your emotions and improve your relationships with this comprehensive guide',
          thumbnail: 'https://img.youtube.com/vi/Y7m9eNoB3NU/maxresdefault.jpg',
          videoId: 'Y7m9eNoB3NU',
          duration: '20:15',
          views: '2.8M',
          difficulty: 'Intermediate'
        },
        {
          id: 10,
          title: 'How to Read People\'s Emotions',
          description: 'Develop empathy and social awareness through understanding emotional cues',
          thumbnail: 'https://img.youtube.com/vi/YQHsXMglC9A/maxresdefault.jpg',
          videoId: 'YQHsXMglC9A',
          duration: '13:45',
          views: '1.7M',
          difficulty: 'Beginner'
        },
        {
          id: 11,
          title: 'Managing Difficult Emotions as a Student',
          description: 'Learn healthy ways to process stress, anxiety, and overwhelming feelings',
          thumbnail: 'https://img.youtube.com/vi/RcGyVTAoXEU/maxresdefault.jpg',
          videoId: 'RcGyVTAoXEU',
          duration: '17:22',
          views: '1.3M',
          difficulty: 'Beginner'
        }
      ]
    },
    'mindfulness': {
      name: 'Mindfulness & Focus',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      videos: [
        {
          id: 12,
          title: '5 Minute Meditation for Students',
          description: 'Quick and effective meditation techniques to reduce stress and improve focus',
          thumbnail: 'https://img.youtube.com/vi/inpok4MKVLM/maxresdefault.jpg',
          videoId: 'inpok4MKVLM',
          duration: '5:32',
          views: '4.1M',
          difficulty: 'Beginner'
        },
        {
          id: 13,
          title: 'Mindfulness for Better Study Habits',
          description: 'Use mindfulness techniques to improve concentration and learning efficiency',
          thumbnail: 'https://img.youtube.com/vi/thFVRg6eTOg/maxresdefault.jpg',
          videoId: 'thFVRg6eTOg',
          duration: '11:48',
          views: '2.3M',
          difficulty: 'Intermediate'
        },
        {
          id: 14,
          title: 'Breathing Techniques for Instant Calm',
          description: 'Master powerful breathing exercises to manage stress and anxiety',
          thumbnail: 'https://img.youtube.com/vi/YRPh_GaiL8s/maxresdefault.jpg',
          videoId: 'YRPh_GaiL8s',
          duration: '8:20',
          views: '1.8M',
          difficulty: 'Beginner'
        }
      ]
    },
    'leadership': {
      name: 'Leadership & Communication',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      videos: [
        {
          id: 15,
          title: 'Leadership Skills Every Student Needs',
          description: 'Develop essential leadership qualities for academic and personal success',
          thumbnail: 'https://img.youtube.com/vi/QQaWlIbFRz4/maxresdefault.jpg',
          videoId: 'QQaWlIbFRz4',
          duration: '18:35',
          views: '2.6M',
          difficulty: 'Intermediate'
        },
        {
          id: 16,
          title: 'Effective Communication for Teens',
          description: 'Master the art of clear, confident communication in school and life',
          thumbnail: 'https://img.youtube.com/vi/HAnw168huqA/maxresdefault.jpg',
          videoId: 'HAnw168huqA',
          duration: '14:12',
          views: '1.9M',
          difficulty: 'Beginner'
        },
        {
          id: 17,
          title: 'How to Influence People Positively',
          description: 'Learn ethical influence techniques to inspire and motivate others',
          thumbnail: 'https://img.youtube.com/vi/cFLjudWTuGQ/maxresdefault.jpg',
          videoId: 'cFLjudWTuGQ',
          duration: '21:45',
          views: '1.5M',
          difficulty: 'Advanced'
        }
      ]
    },
    'growth-mindset': {
      name: 'Growth & Resilience',
      icon: Sparkles,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      videos: [
        {
          id: 18,
          title: 'The Power of Growth Mindset',
          description: 'Transform how you think about challenges and failures to achieve more',
          thumbnail: 'https://img.youtube.com/vi/hiiEeMN7vbQ/maxresdefault.jpg',
          videoId: 'hiiEeMN7vbQ',
          duration: '16:28',
          views: '3.8M',
          difficulty: 'Beginner'
        },
        {
          id: 19,
          title: 'Building Mental Resilience - Animated Guide',
          description: 'Learn to bounce back from setbacks with this engaging visual explanation',
          thumbnail: 'https://img.youtube.com/vi/NWH8N-BvhAw/maxresdefault.jpg',
          videoId: 'NWH8N-BvhAw',
          duration: '12:45',
          views: '2.2M',
          difficulty: 'Intermediate'
        },
        {
          id: 20,
          title: 'How to Turn Failure into Success',
          description: 'Reframe your relationship with failure and use it as a stepping stone',
          thumbnail: 'https://img.youtube.com/vi/45mMioJ5szc/maxresdefault.jpg',
          videoId: '45mMioJ5szc',
          duration: '19:15',
          views: '1.6M',
          difficulty: 'Intermediate'
        }
      ]
    }
  }

  const currentCategory = resourceCategories[activeTab]
  const currentVideos = currentCategory?.videos || []
  const displayedVideos = showAll ? currentVideos : currentVideos.slice(0, 3)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const openVideo = (video) => {
    setSelectedVideo(video)
  }

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            🎓 Holistic Development Resources
          </h3>
          <p className="text-gray-600">
            Grow personally and academically with expert guidance
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
        {Object.entries(resourceCategories).map(([key, category]) => {
          const Icon = category.icon
          return (
            <motion.button
              key={key}
              onClick={() => setActiveTab(key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === key
                  ? `${category.bgColor} ${category.color} shadow-md`
                  : 'text-gray-600 hover:bg-white hover:shadow-sm'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{category.name}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {displayedVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group cursor-pointer"
            onClick={() => openVideo(video)}
          >
            <div className="relative rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-white rounded-full p-4 shadow-lg"
                >
                  <Play className="h-8 w-8 text-red-600 fill-current" />
                </motion.div>
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{video.duration}</span>
              </div>

              {/* Difficulty Badge */}
              <div className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(video.difficulty)}`}>
                {video.difficulty}
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {video.title}
              </h4>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {video.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{video.views} views</span>
                </div>
                <div className={`px-2 py-1 rounded-full ${currentCategory.bgColor} ${currentCategory.color} font-medium`}>
                  {currentCategory.name}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {currentVideos.length > 3 && (
        <div className="text-center">
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-5 w-5" />
                <span>Show Less</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-5 w-5" />
                <span>🚀 Explore More Wisdom</span>
              </>
            )}
          </motion.button>
        </div>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedVideo.title}
                </h3>
                <button
                  onClick={closeVideo}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              <div className="aspect-video mb-4 rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <p className="text-gray-700 mb-4">
                    {selectedVideo.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedVideo.difficulty)}`}>
                      {selectedVideo.difficulty}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${currentCategory.bgColor} ${currentCategory.color}`}>
                      {currentCategory.name}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Watch on YouTube</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default YouTubeResources
