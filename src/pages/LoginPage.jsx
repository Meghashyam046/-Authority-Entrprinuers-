import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'
import { users } from '../data/mockData'
import { fadeIn, slideUp } from '../utils/motion'

const LoginPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const savedUsername = localStorage.getItem('rememberedUsername')
    if (savedUsername) {
      setValue('username', savedUsername)
      setRememberMe(true)
    }
  }, [])

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    setTimeout(() => {
      const user = users.find(
        (u) => u.username === data.username && u.password === data.password
      )

      if (user) {
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', data.username)
        } else {
          localStorage.removeItem('rememberedUsername')
        }
        
        localStorage.setItem('currentUser', JSON.stringify(user))
        toast.success(`Welcome back, ${user.name}!`)
        
        setTimeout(() => {
          navigate('/welcome')
        }, 500)
      } else {
        toast.error('Invalid username or password')
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <Card className="glass-card p-8 md:p-10">
          <motion.div
            className="text-center mb-8"
            variants={slideUp}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
              <FiLogIn className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue to your dashboard</p>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <Input
                label="Username"
                icon={<FiUser />}
                placeholder="Enter your username"
                error={errors.username?.message}
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                })}
              />
            </motion.div>

            <motion.div
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Input
                label="Password"
                type="password"
                icon={<FiLock />}
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
            </motion.div>

            <motion.div
              className="flex items-center justify-between"
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary bg-white/50 border-gray-300 rounded focus:ring-primary focus:ring-2 transition-all duration-200"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-primary transition-colors duration-200">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Forgot password?
              </a>
            </motion.div>

            <motion.div
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Signing in...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <FiLogIn className="mr-2" />
                    Sign In
                  </span>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div
            className="mt-6 text-center"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-600">
              Demo credentials:{' '}
              <span className="font-medium text-primary">admin / admin123</span>
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}

export default LoginPage
