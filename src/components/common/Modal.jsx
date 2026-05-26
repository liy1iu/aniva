import { X } from 'lucide-react'
import Button from './Button'

function Modal({ open, title, children, onClose }) {
  // closed modal renders nothing
  if (!open) return null

  return (
    // backdrop keeps focus on the modal content
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <section className="glass w-full max-w-lg rounded-lg p-5 text-left">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-heading text-xl font-bold text-paper">{title}</h2>
          <Button variant="secondary" className="h-10 w-10 px-0" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </Button>
        </div>
        {children}
      </section>
    </div>
  )
}

export default Modal
