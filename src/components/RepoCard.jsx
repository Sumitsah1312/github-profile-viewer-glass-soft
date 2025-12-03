import { formatNumber } from '../utils/helpers'
import { FiStar, FiGitBranch } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function RepoCard({ repo }) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ translateY: -6, scale: 1.01 }}
      href={repo.html_url}
      target="_blank"
      className="block glass card"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold text-lg">{repo.name}</div>
          <div className="small-muted mt-1">{repo.description}</div>
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-3">
            {repo.language && <span className="px-2 py-1 bg-white/30 dark:bg-white/6 rounded text-xs">{repo.language}</span>}
            <span className="flex items-center gap-1"><FiStar /> {formatNumber(repo.stargazers_count)}</span>
            <span className="flex items-center gap-1"><FiGitBranch /> {formatNumber(repo.forks_count)}</span>
          </div>
        </div>
        <div className="text-xs text-gray-400">{new Date(repo.updated_at).toLocaleDateString()}</div>
      </div>
    </motion.a>
  )
}
