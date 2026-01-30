import React, { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'vibe'
    } catch (e) {
      return 'vibe'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme])

  return (
    <button
      aria-label="Toggle theme"
      className="btn btn-ghost"
      onClick={() => setTheme(t => (t === 'vibe' ? 'vibe-dark' : 'vibe'))}
    >
      {theme === 'vibe' ? '🌞' : '🌙'}
    </button>
  )
}
