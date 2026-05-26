export const typeLabels = ['anime', 'mangá', 'manhwa', 'manhua']

export function getTypes(item) {
  // supports both the newer types[] field and the older type field
  return item.types?.length ? item.types : [item.type].filter(Boolean)
}

export function getPrimaryType(item) {
  // returns one type when the ui only needs one label
  return getTypes(item)[0] || ''
}

export function getFormatStats(item) {
  // uses richer format data when available
  if (item.formats?.length) return item.formats

  return item.episodes
    ? [{ type: getPrimaryType(item), length: `${item.episodes} itens cadastrados` }]
    : []
}

export function uniqueValues(items, key) {
  // flattens arrays like genres/vibes and returns a sorted list
  return [...new Set(items.flatMap((item) => item[key]))].sort()
}

export function uniqueTypes(items) {
  // collects types from titles that can have more than one
  return [...new Set(items.flatMap(getTypes))].sort()
}

export function isSaved(list, id) {
  // checks if a media id is already saved
  return list.includes(id)
}

export function toggleSaved(list, id) {
  // toggles an id inside a saved list
  return isSaved(list, id) ? list.filter((itemId) => itemId !== id) : [...list, id]
}
