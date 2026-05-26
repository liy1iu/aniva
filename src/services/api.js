export async function getMediaCatalog() {
  // fetches the local catalog json
  const response = await fetch('/data/media.json')

  if (!response.ok) {
    throw new Error('Nao foi possivel carregar o catalogo.')
  }

  return response.json()
}

export async function getMediaById(id) {
  // reuses the catalog and finds one title by id
  const catalog = await getMediaCatalog()
  return catalog.find((item) => item.id === id)
}
