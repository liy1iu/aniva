import Card from '../common/Card'

function UserStats({ favoritesCount, watchlistCount, catalogCount }) {
  // quick counters for saved items and catalog size
  const stats = [
    ['favoritos', favoritesCount],
    ['na lista', watchlistCount],
    ['catálogo', catalogCount],
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map(([label, value]) => (
        <Card key={label} className="p-5">
          <p className="text-sm text-muted">{label}</p>
          <strong className="mt-2 block font-sans text-4xl text-paper">{value}</strong>
        </Card>
      ))}
    </div>
  )
}

export default UserStats
