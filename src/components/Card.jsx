import { motion } from 'framer-motion'

const Card = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      className={`bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl ${className}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
