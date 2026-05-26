import { useRef, useState } from 'react'

export default function DotPattern() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 })
  const ref = useRef(null)

  function handleMove(e) {
    // tracks the cursor so the svg glow follows along
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    // lightweight svg dotted background option
    <div ref={ref} onMouseMove={handleMove} className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="var(--dot)" />
          </pattern>
          <radialGradient id="g" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(255,0,110,0.18)" />
            <stop offset="60%" stopColor="rgba(199,21,133,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
        <circle cx={pos.x} cy={pos.y} r="180" fill="url(#g)" />
      </svg>
    </div>
  )
}
