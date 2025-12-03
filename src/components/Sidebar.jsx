import { NavLink } from 'react-router-dom'
import { FiHome, FiUsers, FiGithub, FiStar } from 'react-icons/fi'

export default function Sidebar(){
  const linkClass = ({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-2 rounded-xl glass' : 'flex items-center gap-3 px-4 py-2 rounded-xl hover:glass'
  return (
    <aside className="w-64 hidden md:block p-6">
      <div className="glass card">
        <div className="text-xl font-bold mb-6">GitHub Viewer</div>
        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={linkClass}><FiHome /> Home</NavLink>
          <NavLink to="/compare" className={linkClass}><FiStar /> Compare</NavLink>
          <a href="https://github.com" target="_blank" className="flex items-center gap-3 px-4 py-2 rounded-xl hover:glass"><FiGithub/> GitHub</a>
        </nav>
        <div className="mt-6 small-muted">Built with React • Tailwind</div>
      </div>
    </aside>
  )
}
