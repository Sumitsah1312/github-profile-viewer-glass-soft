import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getFollowers } from '../api/github'
import Skeleton from '../components/Skeleton'

export default function FollowersPage(){
  const { username } = useParams()
  const [followers, setFollowers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getFollowers(username).then(res => {
      setFollowers(res)
    }).catch(()=>{}).finally(()=>setLoading(false))
  }, [username])

  if (loading) return <Skeleton className="h-64 rounded-lg" />

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Followers of {username}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {followers.map(u => (
          <a key={u.id} href={u.html_url} target="_blank" className="block glass card">
            <div className="flex items-center gap-3">
              <img src={u.avatar_url} className="w-12 h-12 rounded-full" alt="" />
              <div>
                <div className="font-medium">{u.login}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
