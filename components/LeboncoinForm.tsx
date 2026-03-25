'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'
import type { LeboncoinParams } from '@/types'
import { LEBONCOIN_CATEGORIES } from '@/types'

interface Props {
  onSubmit: (params: LeboncoinParams) => void
  loading: boolean
}

const PRESETS_RENO = [
  'pompe à chaleur', 'PAC air air', 'panneaux solaires', 'radiateur électrique',
  'double vitrage', 'isolation combles', 'chaudière fioul', 'ballon thermodynamique',
]
const PRESETS_AUTO = [
  'voiture accidentée', 'moteur cassé', 'carrosserie', 'pièces détachées',
]

export default function LeboncoinForm({ onSubmit, loading }: Props) {
  const [keywords, setKeywords] = useState('')
  const [localisation, setLocalisation] = useState('')
  const [categorieId, setCategorieId] = useState(12)
  const [prixMin, setPrixMin] = useState('')
  const [prixMax, setPrixMax] = useState('')
  const [typeVendeur, setTypeVendeur] = useState<'all' | 'private' | 'professional'>('private')
  const [nbResults, setNbResults] = useState(50)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      keywords: keywords.trim(),
      localisation: localisation.trim(),
      categorie_id: categorieId,
      prix_min: prixMin ? +prixMin : null,
      prix_max: prixMax ? +prixMax : null,
      type_vendeur: typeVendeur,
      nb_results: nbResults,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Mots-clés</label>
          <input
            className="input"
            placeholder="ex: pompe à chaleur, double vitrage..."
            value={keywords}
            onChange={e => setKeywords(e.target.value)}
          />
          <div className="mt-1.5 space-y-1">
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] text-slate-600 mr-1">Réno énergie :</span>
              {PRESETS_RENO.slice(0, 4).map(s => (
                <button key={s} type="button" onClick={() => { setKeywords(s); setCategorieId(12) }}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors">
                  {s}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] text-slate-600 mr-1">Voiture :</span>
              {PRESETS_AUTO.slice(0, 3).map(s => (
                <button key={s} type="button" onClick={() => { setKeywords(s); setCategorieId(2) }}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Localisation
            <span className="ml-2 text-slate-600 font-normal">(ville, 75 ou 75001)</span>
          </label>
          <input
            className="input"
            placeholder="ex: Paris ou 75 ou 75001"
            value={localisation}
            onChange={e => setLocalisation(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Catégorie</label>
          <select
            className="input"
            value={categorieId}
            onChange={e => setCategorieId(+e.target.value)}
          >
            {LEBONCOIN_CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Type vendeur</label>
          <select
            className="input"
            value={typeVendeur}
            onChange={e => setTypeVendeur(e.target.value as 'all' | 'private' | 'professional')}
          >
            <option value="all">Tous</option>
            <option value="private">Particulier</option>
            <option value="professional">Professionnel</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Résultats : <span className="text-white font-semibold">{nbResults}</span>
          </label>
          <input
            type="range" min={10} max={200} step={10}
            value={nbResults}
            onChange={e => setNbResults(+e.target.value)}
            className="w-full accent-orange-500 mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Prix min (€)</label>
          <input
            type="number" className="input" placeholder="ex: 50000"
            value={prixMin} onChange={e => setPrixMin(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Prix max (€)</label>
          <input
            type="number" className="input" placeholder="ex: 300000"
            value={prixMax} onChange={e => setPrixMax(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary bg-orange-600 hover:bg-orange-700" disabled={loading}>
        <Search className="w-4 h-4" />
        {loading ? 'En cours...' : 'Lancer le scraping LeBonCoin'}
      </button>
    </form>
  )
}
