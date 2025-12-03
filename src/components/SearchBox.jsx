import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { getRecentSearches } from '../utils/helpers'

export default function SearchBox({ onSearch }) {
  const [value, setValue] = useState('')
  const recent = getRecentSearches()
  const nav = useNavigate()

  const submit = (e) => {
    e?.preventDefault()
    const v = value.trim()
    if (!v) return
    nav(`/user/${v}`)
    setValue('')
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2 w-full md:w-2/3">
      <div className="flex items-center gap-2 flex-1 rounded-xl p-2 glass">
        <FiSearch />
        <input value={value} onChange={e => setValue(e.target.value)} placeholder="Search GitHub username" className="flex-1 outline-none bg-transparent" />
        <button type="submit" className="btn-primary">Search</button>
      </div>
    </form>
  )
}
