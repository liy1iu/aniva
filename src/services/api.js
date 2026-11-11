export async function getMediaCatalog() {
  const response = await fetch('/data/media.json')

  if (!response.ok) {
    throw new Error('Nao foi possivel carregar o catalogo.')
  }

  return response.json()
}

export async function getMediaById(id) {
  const catalog = await getMediaCatalog()
  return catalog.find((item) => item.id === id)
}

const PREFIX = 'aniva:'
function readLocal(key, fallback) {
  try {
    const value = window.localStorage.getItem(`${PREFIX}${key}`)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeLocal(key, value) {
  window.localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value))
}

function randomHex(byteCount) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteCount))
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function fromHex(value) {
  return Uint8Array.from(value.match(/.{2}/g) || [], (byte) => Number.parseInt(byte, 16))
}

async function hashPassword(password, salt) {
  if (!crypto.subtle) throw new Error('O navegador não permite criar uma sessão segura neste endereço.')
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: fromHex(salt), iterations: 120000, hash: 'SHA-256' }, key, 256)
  return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function profileOf(user) {
  return { id: user.id, nome: user.nome, email: user.email }
}

function libraryKey(user) {
  return `lista:${user.id}`
}

async function readLibrary(user) {
  const key = libraryKey(user)
  const saved = readLocal(key, null)
  if (saved) return saved

  // quem já usava a lista antiga não perde os favoritos quando entra de novo
  const favorites = readLocal('favorites', [])
  const watchlist = readLocal('watchlist', [])
  const statuses = readLocal('watchlist-status', {})
  const pauta = Object.fromEntries(watchlist.map((id) => {
    const savedStatus = statuses[id] || {}
    return [id, {
      status: savedStatus.status || 'a-fazer',
      progresso: savedStatus.progresso ?? savedStatus.progress ?? 0,
    }]
  }))
  const migrated = { favoritos: favorites, pauta }
  writeLocal(key, migrated)
  window.localStorage.removeItem(`${PREFIX}favorites`)
  window.localStorage.removeItem(`${PREFIX}watchlist`)
  window.localStorage.removeItem(`${PREFIX}watchlist-status`)
  return migrated
}

function storeLibrary(user, library) {
  writeLocal(libraryKey(user), library)
  return library
}

export const accountApi = {
  /*
   * MOCK: apenas para desenvolvimento
   * A senha é processada no navegador; usuários e sessão ficam no localStorage.
   * NADA disso pode ir para produção.
   */
  async me() {
    const profile = readLocal('auth:session', null)
    return profile
  },

  async register({ nome, email, senha }) {
    const normalizedEmail = email.trim().toLocaleLowerCase('pt-BR')
    const users = readLocal('auth:users', [])
    if (users.some((user) => user.email === normalizedEmail)) throw new Error('Este e-mail já está cadastrado.')

    const salt = randomHex(16)
    const user = {
      id: `${Date.now().toString(36)}-${randomHex(5)}`,
      nome: nome.trim(),
      email: normalizedEmail,
      salt,
      senhaHash: await hashPassword(senha, salt),
    }
    const profile = profileOf(user)
    writeLocal('auth:users', [...users, user])
    writeLocal('auth:session', profile)
    await readLibrary(profile)
    return profile
  },

  async login({ email, senha }) {
    const normalizedEmail = email.trim().toLocaleLowerCase('pt-BR')
    const user = readLocal('auth:users', []).find((entry) => entry.email === normalizedEmail)
    if (!user || await hashPassword(senha, user.salt) !== user.senhaHash) throw new Error('E-mail ou senha incorretos.')

    const profile = profileOf(user)
    writeLocal('auth:session', profile)
    await readLibrary(profile)
    return profile
  },

  async logout() {
    window.localStorage.removeItem(`${PREFIX}auth:session`)
  },

  async library(user) {
    return readLibrary(user)
  },

  async toggleFavorite(user, mediaId) {
    const library = await readLibrary(user)
    const favoritos = library.favoritos.includes(mediaId)
      ? library.favoritos.filter((id) => id !== mediaId)
      : [...library.favoritos, mediaId]
    return storeLibrary(user, { ...library, favoritos })
  },

  async toggleWatchlist(user, mediaId) {
    const library = await readLibrary(user)
    const pauta = { ...library.pauta }
    if (pauta[mediaId]) delete pauta[mediaId]
    else pauta[mediaId] = { status: 'a-fazer', progresso: 0 }
    return storeLibrary(user, { ...library, pauta })
  },

  async updateWatchlist(user, mediaId, change) {
    const library = await readLibrary(user)
    const pauta = { ...library.pauta }
    const current = pauta[mediaId] || { status: 'a-fazer', progresso: 0 }
    const next = { ...current, ...change }
    if (next.status === 'concluido') next.progresso = 100
    if (next.status === 'a-fazer') next.progresso = 0
    pauta[mediaId] = next
    return storeLibrary(user, { ...library, pauta })
  },
}

const feedbackKey = (kind, mediaId) => `${PREFIX}obra:${mediaId}:${kind}`

function readFeedback(kind, mediaId, fallback) {
  try {
    return JSON.parse(window.localStorage.getItem(feedbackKey(kind, mediaId))) ?? fallback
  } catch {
    return fallback
  }
}

function writeFeedback(kind, mediaId, value) {
  window.localStorage.setItem(feedbackKey(kind, mediaId), JSON.stringify(value))
  return value
}

export const feedbackApi = {
  /*
   * MOCK: apenas para desenvolvimento
   * Notas e comentários ficam no localStorage.
   * NADA disso pode ir para produção.
   */
  async ratings(mediaId) {
    return readFeedback('ratings', mediaId, {})
  },
  async rate(mediaId, userId, value) {
    return writeFeedback('ratings', mediaId, { ...readFeedback('ratings', mediaId, {}), [userId]: value })
  },
  async removeRating(mediaId, userId) {
    const ratings = { ...readFeedback('ratings', mediaId, {}) }
    delete ratings[userId]
    return writeFeedback('ratings', mediaId, ratings)
  },
  async comments(mediaId) {
    return readFeedback('comments', mediaId, [])
  },
  async addComment(mediaId, user, text, spoiler) {
    const comment = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      authorId: user.id,
      author: user.nome,
      text,
      spoiler,
      likes: [],
      createdAt: new Date().toISOString(),
    }
    return writeFeedback('comments', mediaId, [...readFeedback('comments', mediaId, []), comment])
  },
  async toggleCommentLike(mediaId, userId, commentId) {
    const comments = readFeedback('comments', mediaId, []).map((comment) => {
      if (comment.id !== commentId) return comment
      const likes = comment.likes.includes(userId)
        ? comment.likes.filter((id) => id !== userId)
        : [...comment.likes, userId]
      return { ...comment, likes }
    })
    return writeFeedback('comments', mediaId, comments)
  },
  async deleteComment(mediaId, userId, commentId) {
    return writeFeedback('comments', mediaId, readFeedback('comments', mediaId, [])
      .filter((comment) => comment.id !== commentId || comment.authorId !== userId))
  },
}
