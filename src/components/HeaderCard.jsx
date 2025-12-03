import Avatar from './Avatar'

export default function HeaderCard(){
  return (
    <div className="glass card">
      <div className="flex items-center gap-3">
        <Avatar src="https://i.pravatar.cc/80" alt="avatar" size={64} />
        <div>
          <div className="font-semibold">GitHub Profile Viewer</div>
          <div className="small-muted">Resume-ready project</div>
        </div>
      </div>

      <div className="mt-4 small-muted">
        Built with React, Tailwind and Recharts. Use Vercel for quick deploy.
      </div>
    </div>
  )
}
