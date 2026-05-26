import MediaGrid from '../media/MediaGrid'

function FavoritesList(props) {
  // uses the catalog grid with a favorites empty state
  return <MediaGrid {...props} emptyMessage="você ainda não curtiu nenhum título." />
}

export default FavoritesList
