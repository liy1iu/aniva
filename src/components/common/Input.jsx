function Input({ className = '', error, ...props }) {
  return (
    // shared input with inline error text
    <label className="block">
      <input
        className={`h-11 w-full rounded-md border border-white/10 bg-white/[0.06] px-4 text-sm text-paper outline-none transition placeholder:text-muted focus:border-neon/70 focus:ring-4 focus:ring-neon/10 ${className}`}
        {...props}
      />
      {error ? <span className="mt-2 block text-left text-xs text-neon">{error}</span> : null}
    </label>
  )
}

export default Input
