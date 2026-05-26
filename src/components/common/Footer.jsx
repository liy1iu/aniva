function Footer() {
  return (
    // simple footer with the project stack
    <footer className="border-t border-white/10 bg-panel/50 px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>ANIVA - catálogo acadêmico com React, Fetch API e LocalStorage.</p>
        <p className="font-sans text-base lowercase text-paper">html5 - css grid - flexbox - tailwind</p>
      </div>
    </footer>
  )
}

export default Footer
