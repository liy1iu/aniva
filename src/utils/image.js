export function handleFallbackImage(event) {
  // swaps broken external images to the local fallback once
  if (event.currentTarget.src.endsWith('/data/fallback.svg')) return
  event.currentTarget.src = '/data/fallback.svg'
}
