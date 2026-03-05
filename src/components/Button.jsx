import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const Button = forwardRef((
  { children, variant = 'primary', className = '', disabled = false, ...props },
  ref
) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
    secondary: 'bg-white/20 backdrop-blur-sm border border-white/30 text-gray-800 hover:bg-white/30 focus:ring-primary',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
  }

  return (
    <motion.button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button
