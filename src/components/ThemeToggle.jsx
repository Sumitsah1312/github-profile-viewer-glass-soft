import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle(){
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', mode)
  }, [mode])

  return (
    <button
      onClick={() => setMode(m => m === 'dark' ? 'light' : 'dark')}
      className="px-3 py-2 rounded-lg border glass"
    >
      {mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
