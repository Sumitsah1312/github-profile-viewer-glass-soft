import { useState } from 'react'
import { getUser, getRepos } from '../api/github'
import RepoCard from '../components/RepoCard'
import Avatar from '../components/Avatar'
import toast from 'react-hot-toast'
import { saveRecentSearch } from '../utils/helpers'

export default function Compare(){
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [lUser, setLUser] = useState(null)
  const [rUser, setRUser] = useState(null)
  const [lRepos, setLRepos] = useState([])
  const [rRepos, setRRepos] = useState([])

  const load = async (username, setUser, setRepos) => {
    try {
      const u = await getUser(username)
      const repos = await getRepos(username, 1, 100)
      setUser(u)
      setRepos(repos)
      saveRecentSearch(username)
    } catch (err) {
      toast.error('User not found: ' + username)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Compare Users</h2>

      <div className="flex gap-2 mb-4">
        <input value={left} onChange={e=>setLeft(e.target.value)} placeholder="Left username" className="border rounded px-2 py-1" />
        <input value={right} onChange={e=>setRight(e.target.value)} placeholder="Right username" className="border rounded px-2 py-1" />
        <button onClick={() => load(left, setLUser, setLRepos)} className="btn-primary rounded">Load Left</button>
        <button onClick={() => load(right, setRUser, setRRepos)} className="btn-primary rounded">Load Right</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass card">
          {lUser ? (
            <>
              <div className="flex items-center gap-3">
                <Avatar src={lUser.avatar_url} alt={lUser.login} />
                <div>
                  <div className="font-semibold">{lUser.name || lUser.login}</div>
                  <div className="small-muted">@{lUser.login}</div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Top repos</h4>
                <div className="grid gap-2">
                  {lRepos.slice(0,4).map(r=> <RepoCard key={r.id} repo={r} />)}
                </div>
              </div>
            </>
          ) : <div className="small-muted">No left user</div>}
        </div>

        <div className="glass card">
          {rUser ? (
            <>
              <div className="flex items-center gap-3">
                <Avatar src={rUser.avatar_url} alt={rUser.login} />
                <div>
                  <div className="font-semibold">{rUser.name || rUser.login}</div>
                  <div className="small-muted">@{rUser.login}</div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Top repos</h4>
                <div className="grid gap-2">
                  {rRepos.slice(0,4).map(r=> <RepoCard key={r.id} repo={r} />)}
                </div>
              </div>
            </>
          ) : <div className="small-muted">No right user</div>}
        </div>
      </div>
    </div>
  )
}
