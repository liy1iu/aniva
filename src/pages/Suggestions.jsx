import { Mail, MessageCircle, PenLine, Plus, ThumbsUp, Trash2, UserRound } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Modal from '../components/common/Modal'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { typeLabels } from '../utils/helpers'
import { validateSuggestion, validateUser } from '../utils/validation'
import Page from './Page'

const initialUserForm = {
  name: '',
  username: '',
  email: '',
  password: '',
  favoriteType: '',
  bio: '',
}

const initialSuggestionForm = {
  userId: '',
  title: '',
  type: '',
  reason: '',
}

function Suggestions() {
  // users and suggestions stay in localstorage
  const [users, setUsers] = useLocalStorage('users', [])
  const [suggestions, setSuggestions] = useLocalStorage('suggestions', [])
  const [userForm, setUserForm] = useState(initialUserForm)
  const [suggestionForm, setSuggestionForm] = useState(initialSuggestionForm)
  const [userErrors, setUserErrors] = useState({})
  const [suggestionErrors, setSuggestionErrors] = useState({})
  const [userToDelete, setUserToDelete] = useState(null)
  const [suggestionToDelete, setSuggestionToDelete] = useState(null)

  // updates one user field and clears its error
  function updateUserField(field, value) {
    setUserForm((current) => ({ ...current, [field]: value }))
    setUserErrors((current) => ({ ...current, [field]: '' }))
  }

  // updates one suggestion field and clears its error
  function updateSuggestionField(field, value) {
    setSuggestionForm((current) => ({ ...current, [field]: value }))
    setSuggestionErrors((current) => ({ ...current, [field]: '' }))
  }

  // creates the user after validation
  function submitUser(event) {
    event.preventDefault()
    const nextErrors = validateUser(userForm)

    if (Object.keys(nextErrors).length) {
      setUserErrors(nextErrors)
      return
    }

    const user = {
      id: crypto.randomUUID(),
      name: userForm.name.trim(),
      username: userForm.username.trim().toLowerCase(),
      email: userForm.email.trim().toLowerCase(),
      favoriteType: userForm.favoriteType,
      bio: userForm.bio.trim(),
      createdAt: new Date().toISOString(),
    }

    setUsers((current) => [user, ...current])
    setSuggestionForm((current) => ({ ...current, userId: user.id }))
    setUserForm(initialUserForm)
    setUserErrors({})
  }

  // suggestions need a registered user as author
  function submitSuggestion(event) {
    event.preventDefault()
    const nextErrors = validateSuggestion(suggestionForm, users)

    if (Object.keys(nextErrors).length) {
      setSuggestionErrors(nextErrors)
      return
    }

    const author = users.find((user) => user.id === suggestionForm.userId)

    setSuggestions((current) => [
      {
        id: crypto.randomUUID(),
        userId: suggestionForm.userId,
        username: author?.username || 'usuário',
        title: suggestionForm.title.trim(),
        type: suggestionForm.type,
        reason: suggestionForm.reason.trim(),
        upvotes: 0,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ])
    setSuggestionForm((current) => ({ ...initialSuggestionForm, userId: current.userId }))
    setSuggestionErrors({})
  }

  function confirmUserDelete() {
    if (!userToDelete) return

    setUsers((current) => current.filter((user) => user.id !== userToDelete.id))
    setSuggestions((current) => current.filter((suggestion) => suggestion.userId !== userToDelete.id))
    setSuggestionForm((current) => (current.userId === userToDelete.id ? { ...current, userId: '' } : current))
    setUserToDelete(null)
  }

  function upvoteSuggestion(id) {
    setSuggestions((current) =>
      current.map((suggestion) =>
        suggestion.id === id
          ? { ...suggestion, upvotes: (suggestion.upvotes || 0) + 1 }
          : suggestion,
      ),
    )
  }

  function confirmSuggestionDelete() {
    if (!suggestionToDelete) return

    setSuggestions((current) => current.filter((item) => item.id !== suggestionToDelete.id))
    setSuggestionToDelete(null)
  }

  return (
    <Page className="min-h-screen px-4 pb-16 pt-24 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[410px_1fr]">
        <section className="glass comic-card h-fit rounded-lg p-5">
          <p className="font-sans text-sm font-bold lowercase text-neon">cadastro</p>
          <h1 className="mt-1 font-heading text-4xl font-bold text-paper">criar usuário</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            primeiro crie um perfil. depois ele pode enviar indicações para o catálogo.
          </p>

          <form className="mt-6 space-y-4" onSubmit={submitUser} noValidate>
            <Input
              value={userForm.name}
              onChange={(event) => updateUserField('name', event.target.value)}
              error={userErrors.name}
              placeholder="nome"
            />

            <Input
              value={userForm.username}
              onChange={(event) => updateUserField('username', event.target.value)}
              error={userErrors.username}
              placeholder="usuário"
            />

            <Input
              type="email"
              value={userForm.email}
              onChange={(event) => updateUserField('email', event.target.value)}
              error={userErrors.email}
              placeholder="e-mail"
            />

            <Input
              type="password"
              value={userForm.password}
              onChange={(event) => updateUserField('password', event.target.value)}
              error={userErrors.password}
              placeholder="senha"
            />

            <label className="block">
              <select
                value={userForm.favoriteType}
                onChange={(event) => updateUserField('favoriteType', event.target.value)}
                className="h-11 w-full rounded-md border border-white/10 bg-[#161616] px-3 text-sm text-paper outline-none focus:border-neon/70"
              >
                <option value="">preferência principal</option>
                {typeLabels.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {userErrors.favoriteType ? <span className="mt-2 block text-left text-xs text-neon">{userErrors.favoriteType}</span> : null}
            </label>

            <label className="block">
              <textarea
                value={userForm.bio}
                onChange={(event) => updateUserField('bio', event.target.value)}
                placeholder="bio curta, opcional"
                className="min-h-24 w-full resize-y rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-paper outline-none transition placeholder:text-muted focus:border-neon/70 focus:ring-4 focus:ring-neon/10"
              />
              {userErrors.bio ? <span className="mt-2 block text-left text-xs text-neon">{userErrors.bio}</span> : null}
            </label>

            <Button className="w-full" type="submit">
              <UserRound size={18} />
              salvar usuário
            </Button>
          </form>
        </section>

        <div className="space-y-6">
          <section className="glass rounded-lg p-5">
            <p className="font-sans text-sm font-bold lowercase text-neon">indicações</p>
            <h2 className="mt-1 font-heading text-3xl font-bold text-paper">indicar título</h2>
            <p className="mt-2 text-sm text-muted">selecione um usuário cadastrado para liberar o envio.</p>

            <form className="mt-5 grid gap-4 lg:grid-cols-2" onSubmit={submitSuggestion} noValidate>
              <label className="block lg:col-span-2">
                <select
                  value={suggestionForm.userId}
                  onChange={(event) => updateSuggestionField('userId', event.target.value)}
                  className="h-11 w-full rounded-md border border-white/10 bg-[#161616] px-3 text-sm text-paper outline-none focus:border-neon/70"
                >
                  <option value="">usuário responsável</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      @{user.username} - {user.name}
                    </option>
                  ))}
                </select>
                {suggestionErrors.userId ? <span className="mt-2 block text-left text-xs text-neon">{suggestionErrors.userId}</span> : null}
              </label>

              <Input
                value={suggestionForm.title}
                onChange={(event) => updateSuggestionField('title', event.target.value)}
                error={suggestionErrors.title}
                placeholder="nome do título"
              />

              <label className="block">
                <select
                  value={suggestionForm.type}
                  onChange={(event) => updateSuggestionField('type', event.target.value)}
                  className="h-11 w-full rounded-md border border-white/10 bg-[#161616] px-3 text-sm text-paper outline-none focus:border-neon/70"
                >
                  <option value="">tipo de mídia</option>
                  {typeLabels.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {suggestionErrors.type ? <span className="mt-2 block text-left text-xs text-neon">{suggestionErrors.type}</span> : null}
              </label>

              <label className="block lg:col-span-2">
                <textarea
                  value={suggestionForm.reason}
                  onChange={(event) => updateSuggestionField('reason', event.target.value)}
                  placeholder="por que vale entrar no catálogo?"
                  className="min-h-24 w-full resize-y rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-paper outline-none transition placeholder:text-muted focus:border-neon/70 focus:ring-4 focus:ring-neon/10"
                />
                {suggestionErrors.reason ? <span className="mt-2 block text-left text-xs text-neon">{suggestionErrors.reason}</span> : null}
              </label>

              <Button className="lg:col-span-2" type="submit" disabled={!users.length}>
                <Plus size={18} />
                salvar indicação
              </Button>
            </form>
          </section>

          <section>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-sans text-sm font-bold lowercase text-neon">consulta</p>
                <h2 className="font-heading text-3xl font-bold text-paper">usuários cadastrados</h2>
              </div>
              <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-sans text-paper">{users.length}</span>
            </div>

            {users.length ? (
              <div className="grid gap-4">
                {users.map((user) => (
                  <article key={user.id} className="glass rounded-lg p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-sans text-sm font-bold lowercase text-neon">@{user.username}</p>
                        <h3 className="font-heading text-2xl font-bold text-paper">{user.name}</h3>
                      </div>
                      <Button
                        variant="secondary"
                        className="h-10 border-red-400/30 px-3 text-red-200 hover:border-red-300/60 hover:bg-red-500/10 hover:text-red-100"
                        onClick={() => setUserToDelete(user)}
                        aria-label="remover usuário"
                      >
                        <Trash2 size={17} />
                        apagar
                      </Button>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2">
                      <p className="flex items-center gap-2">
                        <Mail size={16} className="text-neon" />
                        {user.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <PenLine size={16} className="text-neon" />
                        prefere {user.favoriteType}
                      </p>
                    </div>

                    {user.bio ? <p className="mt-4 text-sm leading-6 text-muted">{user.bio}</p> : null}
                  </article>
                ))}
              </div>
            ) : (
              <div className="glass rounded-lg p-8 text-center text-muted">nenhum usuário cadastrado ainda.</div>
            )}
          </section>

          <section>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-sans text-sm font-bold lowercase text-neon">mural</p>
                <h2 className="font-heading text-3xl font-bold text-paper">indicações enviadas</h2>
              </div>
              <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-sans text-paper">{suggestions.length}</span>
            </div>

            {suggestions.length ? (
              <div className="grid gap-4">
                {suggestions.map((suggestion) => (
                  <article key={suggestion.id} className="glass rounded-lg p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-sans text-sm font-bold lowercase text-neon">{suggestion.type} por @{suggestion.username}</p>
                        <h3 className="font-heading text-2xl font-bold text-paper">{suggestion.title}</h3>
                      </div>
                      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                        <Button
                          variant="secondary"
                          className="h-10 px-3"
                          onClick={() => upvoteSuggestion(suggestion.id)}
                          aria-label="dar up na indicação"
                        >
                          <ThumbsUp size={17} />
                          up
                          <span className="font-sans text-xs text-muted">{suggestion.upvotes || 0}</span>
                        </Button>
                        <Button
                          variant="secondary"
                          className="h-10 border-red-400/30 px-3 text-red-200 hover:border-red-300/60 hover:bg-red-500/10 hover:text-red-100"
                          onClick={() => setSuggestionToDelete(suggestion)}
                          aria-label="remover indicação"
                        >
                          <Trash2 size={17} />
                          apagar
                        </Button>
                      </div>
                    </div>
                    <p className="mt-3 flex gap-2 text-sm leading-6 text-muted">
                      <MessageCircle size={17} className="mt-1 shrink-0 text-neon" />
                      {suggestion.reason}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="glass rounded-lg p-8 text-center text-muted">nenhuma indicação enviada ainda.</div>
            )}
          </section>
        </div>
      </div>

      <Modal
        open={Boolean(userToDelete)}
        title="remover usuário?"
        onClose={() => setUserToDelete(null)}
      >
        <p className="text-sm leading-6 text-muted">
          Tem certeza que quer apagar o usuário
          {' '}
          <span className="font-semibold text-paper">@{userToDelete?.username}</span>
          ? As indicações feitas por ele também serão removidas.
        </p>
        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <Button variant="secondary" onClick={() => setUserToDelete(null)}>
            cancelar
          </Button>
          <Button onClick={confirmUserDelete}>
            <Trash2 size={17} />
            apagar usuário
          </Button>
        </div>
      </Modal>

      <Modal
        open={Boolean(suggestionToDelete)}
        title="remover indicação?"
        onClose={() => setSuggestionToDelete(null)}
      >
        <p className="text-sm leading-6 text-muted">
          Tem certeza que quer apagar a indicação
          {' '}
          <span className="font-semibold text-paper">{suggestionToDelete?.title}</span>
          ? Essa ação não pode ser desfeita.
        </p>
        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <Button variant="secondary" onClick={() => setSuggestionToDelete(null)}>
            cancelar
          </Button>
          <Button onClick={confirmSuggestionDelete}>
            <Trash2 size={17} />
            apagar
          </Button>
        </div>
      </Modal>
    </Page>
  )
}

export default Suggestions
