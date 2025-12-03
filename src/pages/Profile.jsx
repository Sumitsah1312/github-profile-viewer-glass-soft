import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getUser, getRepos, getPinnedRepos } from '../api/github'
import RepoCard from '../components/RepoCard'
import HeaderCard from '../components/HeaderCard'
import Avatar from '../components/Avatar'
import LangChart from '../components/LangChart'
import Skeleton from '../components/Skeleton'
import { saveRecentSearch } from '../utils/helpers'
import toast from 'react-hot-toast'

export default function Profile(){
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pinned, setPinned] = useState([])

  useEffect(()=>{
    if(!username) return
    setUser(null); setRepos([]); setPage(1); setHasMore(false); setLoading(true)
    const load = async () => {
      try {
        const u = await getUser(username)
        setUser(u)
        saveRecentSearch(username)
      } catch (err) {
        setUser({ message: 'Not Found' })
      } finally {
        setLoading(false)
      }
    }
    load()
    ;(async ()=> {
      const p = await getPinnedRepos(username)
      setPinned(p || [])
    })()
  },[username])

  useEffect(()=>{
    if(!username) return
    const loadRepos = async () => {
      try {
        const r = await getRepos(username, page, 30)
        setRepos(prev => [...prev, ...r])
        setHasMore(r.length === 30)
      } catch (err) {
        toast.error('Unable to load repos')
      }
    }
    loadRepos()
  },[username, page])

  if(loading){
    return <div className="space-y-4"><Skeleton className="h-8 w-56"/><Skeleton className="h-48 rounded-lg"/><Skeleton className="h-64 rounded-lg"/></div>
  }

  if(user?.message === 'Not Found'){
    return <p className="text-center text-red-500 mt-10">User not found.</p>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="glass card flex items-start gap-4">
          <Avatar src={user.avatar_url} alt={user.login} size={84} />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-semibold">{user.name || user.login}</div>
                <a href={user.html_url} target="_blank" className="small-muted">@{user.login}</a>
                <div className="small-muted mt-2">{user.bio}</div>
              </div>
              <div className="text-right small-muted">
                <div>Followers <strong>{user.followers}</strong></div>
                <div>Following <strong>{user.following}</strong></div>
                <div>Repos <strong>{user.public_repos}</strong></div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link to={`/user/${username}/followers`} className="btn-primary rounded">Followers</Link>
              <a href={user.html_url} target="_blank" className="px-3 py-2 rounded-xl border">View on GitHub</a>
            </div>
          </div>
        </div>

        {pinned.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Pinned</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pinned.map(p => (
                <a key={p.id} href={p.url} className="block glass card">
                  <div className="font-medium">{p.name}</div>
                  <div className="small-muted mt-1">{p.description}</div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-semibold mb-3">Repositories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {repos.map(r => <RepoCard key={r.id} repo={r} />)}
          </div>
          {hasMore && <div className="mt-4 text-center"><button onClick={()=>setPage(p=>p+1)} className="btn-primary rounded">Load more</button></div>}
        </div>
      </div>

      <aside>
        <LangChart repos={repos} />
        <div className="glass card mt-4">
          <h4 className="font-semibold">Profile stats</h4>
          <div className="mt-3 small-muted">Account created: {new Date(user.created_at).toLocaleDateString()}</div>
          <div className="mt-2 small-muted">Public gists: {user.public_gists}</div>
        </div>
      </aside>
    </div>
  )
}
