export function validateSearchTerm(value) {
  // search needs a short useful term
  const term = value.trim()

  if (term.length > 0 && term.length < 2) {
    return 'Digite pelo menos 2 caracteres.'
  }

  if (term.length > 40) {
    return 'A busca deve ter ate 40 caracteres.'
  }

  return ''
}

export function validateUser(form) {
  // keeps user validation outside the component
  const errors = {}

  if (form.name.trim().length < 3) {
    errors.name = 'digite pelo menos 3 letras.'
  }

  if (form.username.trim().length < 3) {
    errors.username = 'escolha um usuário com pelo menos 3 caracteres.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'digite um e-mail válido.'
  }

  if (form.password.length < 6) {
    errors.password = 'a senha precisa ter pelo menos 6 caracteres.'
  }

  if (!form.favoriteType) {
    errors.favoriteType = 'escolha uma preferência.'
  }

  if (form.bio.trim().length > 0 && form.bio.trim().length < 10) {
    errors.bio = 'escreva pelo menos 10 caracteres ou deixe em branco.'
  }

  return errors
}

export function validateSuggestion(form, users) {
  // a suggestion needs author, title, type and reason
  const errors = {}

  if (!form.userId) {
    errors.userId = users.length ? 'escolha o usuário que está indicando.' : 'cadastre um usuário antes de indicar.'
  }

  if (form.title.trim().length < 2) {
    errors.title = 'digite pelo menos 2 letras.'
  }

  if (!form.type) {
    errors.type = 'escolha uma categoria.'
  }

  if (form.reason.trim().length < 10) {
    errors.reason = 'escreva pelo menos 10 caracteres.'
  }

  return errors
}
