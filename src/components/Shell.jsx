import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Shell({ children }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Topbar />
        <main className="mt-6">
          {children}
        </main>
      </div>
    </div>
  )
}
