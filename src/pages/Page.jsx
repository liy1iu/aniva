import { motion } from 'framer-motion'

function Page({ children, className = '' }) {
  return (
    // gives every page the same soft entrance
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.14 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default Page
