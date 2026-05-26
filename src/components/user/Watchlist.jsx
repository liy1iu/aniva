import MediaGrid from '../media/MediaGrid'

function Watchlist(props) {
  // uses the catalog grid with a watchlist empty state
  return <MediaGrid {...props} emptyMessage="sua watchlist ainda está vazia." />
}

export default Watchlist
