import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiLogOut, FiUser, FiMail, FiCalendar, FiActivity } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Card from '../components/Card'
import Button from '../components/Button'
import { fadeIn, slideUp, staggerContainer } from '../utils/motion'

const WelcomePage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (!storedUser) {
      navigate('/login')
      return
    }
    setUser(JSON.parse(storedUser))

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    toast.success('Logged out successfully')
    setTimeout(() => {
      navigate('/login')
    }, 500)
  }

  if (!user) return null

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const stats = [
    { label: 'Projects', value: '12', icon: <FiActivity />, color: 'bg-blue-500' },
    { label: 'Tasks', value: '48', icon: <FiCalendar />, color: 'bg-green-500' },
    { label: 'Messages', value: '24', icon: <FiMail />, color: 'bg-purple-500' },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                Welcome, {user.name}!
              </h1>
              <p className="text-gray-600 text-lg">
                {formatDate(currentTime)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-gray-500">Current Time</div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="btn-outline flex items-center gap-2"
              >
                <FiLogOut />
                Logout
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={slideUp}
              custom={index}
            >
              <Card className="glass-card p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl`}>
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <FiUser className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <FiMail className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <FiUser className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Username</p>
                  <p className="text-lg font-semibold text-gray-800">{user.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/50 rounded-lg">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <FiActivity className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Status</p>
                  <p className="text-lg font-semibold text-green-600">Active</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default WelcomePage
