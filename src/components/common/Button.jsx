import { motion } from 'framer-motion'

function Button({ children, className = '', variant = 'primary', as: Component = 'button', ...props }) {
  // primary and secondary use the same base
  const styles =
    variant === 'secondary'
      ? 'border border-white/20 bg-white/[0.06] text-paper hover:border-neon/50 hover:bg-neon/10 hover:text-neon'
      : 'border border-neon bg-neon text-white shadow-[5px_5px_0_#00F0FF] hover:-translate-y-0.5 hover:bg-[#ff2a86] hover:shadow-[8px_8px_0_#00F0FF]'
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 font-heading text-sm font-bold lowercase transition duration-200 ${styles} ${className}`

  // lets the same styles work on links
  if (Component !== 'button') {
    return (
      <Component className={classes} {...props}>
        {children}
      </Component>
    )
  }

  return (
    // adds a tiny tap feedback
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
