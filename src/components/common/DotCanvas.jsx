import { useEffect, useRef } from 'react'

function DotCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // canvas background reacts to the cursor
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const pointer = { x: -999, y: -999, tx: -999, ty: -999 }
    const dots = []
    let frame = 0
    let width = 0
    let height = 0
    let animationId = 0
    let lastMove = 0

    function resize() {
      // rebuilds the grid when the viewport changes size
      const ratio = 1
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      dots.length = 0
      const gap = width < 640 ? 34 : 30
      for (let y = 0; y < height + gap; y += gap) {
        for (let x = 0; x < width + gap; x += gap) {
          dots.push({ x, y, phase: Math.random() * Math.PI * 2 })
        }
      }
    }

    function move(event) {
      // throttles pointer movement a bit
      const now = performance.now()
      if (now - lastMove < 24) return
      lastMove = now
      const rect = canvas.getBoundingClientRect()
      pointer.tx = event.clientX - rect.left
      pointer.ty = event.clientY - rect.top
    }

    function draw() {
      // animation loop for dots and cursor pull
      frame += 0.016
      pointer.x += (pointer.tx - pointer.x) * 0.08
      pointer.y += (pointer.ty - pointer.y) * 0.08

      context.clearRect(0, 0, width, height)
      context.fillStyle = '#0f0f0f'
      context.fillRect(0, 0, width, height)

      for (const dot of dots) {
        const dx = dot.x - pointer.x
        const dy = dot.y - pointer.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const pull = Math.max(0, 1 - distance / 170)
        const wave = Math.sin(frame * 1.6 + dot.phase) * 0.9
        const ox = dx === 0 ? 0 : (dx / Math.max(distance, 1)) * pull * 7
        const oy = dy === 0 ? 0 : (dy / Math.max(distance, 1)) * pull * 7
        const radius = 1.15 + pull * 1.8

        context.beginPath()
        context.fillStyle = pull > 0.02 ? `rgba(255, 0, 110, ${0.18 + pull * 0.48})` : 'rgba(80, 80, 80, 0.38)'
        context.arc(dot.x + ox + wave * pull, dot.y + oy, radius, 0, Math.PI * 2)
        context.fill()
      }

      const gradient = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 240)
      gradient.addColorStop(0, 'rgba(255, 0, 110, 0.22)')
      gradient.addColorStop(0.45, 'rgba(255, 0, 110, 0.08)')
      gradient.addColorStop(1, 'rgba(15, 15, 15, 0)')
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      animationId = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move)

    return () => {
      // cleans up listeners and animation frame
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

export default DotCanvas
