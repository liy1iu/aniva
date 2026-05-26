import { Search } from 'lucide-react'
import Input from '../common/Input'

function MediaSearch({ value, error, onChange }) {
  return (
    // search with an icon inside the field
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-3 text-muted" size={18} />
      <Input value={value} onChange={(event) => onChange(event.target.value)} error={error} placeholder="buscar por nome" className="pl-10" />
    </div>
  )
}

export default MediaSearch
