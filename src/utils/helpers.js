export function formatNumber(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1)+'M'
  if (n >= 1000) return (n/1000).toFixed(1)+'k'
  return String(n)
}

export function saveRecentSearch(username) {
  try {
    const key = 'recent_searches'
    const arr = JSON.parse(localStorage.getItem(key) || '[]')
    const normalized = username.toLowerCase()
    const filtered = [normalized, ...arr.filter(u => u !== normalized)].slice(0, 6)
    localStorage.setItem(key, JSON.stringify(filtered))
  } catch {}
}

export function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem('recent_searches') || '[]')
  } catch { return [] }
}
