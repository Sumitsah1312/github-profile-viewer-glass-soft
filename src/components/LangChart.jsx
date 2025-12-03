import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useMemo } from 'react'

const COLORS = ['#7c3aed', '#06b6d4', '#fb923c', '#10b981', '#ef4444', '#8b5cf6', '#f59e0b']

export default function LangChart({ repos = [] }) {
  const data = useMemo(() => {
    const map = {}
    repos.forEach(r => {
      if (!r.language) return
      map[r.language] = (map[r.language] || 0) + 1
    })
    return Object.entries(map).map(([k,v]) => ({ name: k, value: v }))
  }, [repos])

  if (data.length === 0) return (
    <div className="glass card">
      <h4 className="font-semibold">Top Languages</h4>
      <div className="small-muted mt-2">No language data available</div>
    </div>
  )

  return (
    <div className="glass card">
      <h4 className="font-semibold mb-2">Top Languages</h4>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} outerRadius={70} label>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
