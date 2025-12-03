import ThemeToggle from './ThemeToggle'
import SearchBox from './SearchBox'

export default function Topbar(){
  return (
    <div className="flex items-center justify-between">
      <SearchBox onSearch={() => {}} />
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </div>
  )
}
