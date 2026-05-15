import type { Mode } from '../App'

export default function ModeSelector({
  value,
  onChange,
}: {
  value: Mode
  onChange: (m: Mode) => void
}) {
  return (
    <div className="grid grid-cols-1 gap-2">
      <button
        type="button"
        onClick={() => onChange('EXPLAIN')}
        className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
          value === 'EXPLAIN'
            ? 'border-indigo-500 bg-indigo-500/15'
            : 'border-slate-800 bg-slate-950/50 hover:bg-slate-900'
        }`}
      >
        <div className="font-semibold">Explain Mode</div>
        <div className="text-xs text-slate-400">Penjelasan step-by-step</div>
      </button>

      <button
        type="button"
        onClick={() => onChange('QUIZ')}
        className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
          value === 'QUIZ'
            ? 'border-indigo-500 bg-indigo-500/15'
            : 'border-slate-800 bg-slate-950/50 hover:bg-slate-900'
        }`}
      >
        <div className="font-semibold">Quiz Mode</div>
        <div className="text-xs text-slate-400">Soal latihan + kunci + pembahasan</div>
      </button>

      <button
        type="button"
        onClick={() => onChange('SUMMARY')}
        className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
          value === 'SUMMARY'
            ? 'border-indigo-500 bg-indigo-500/15'
            : 'border-slate-800 bg-slate-950/50 hover:bg-slate-900'
        }`}
      >
        <div className="font-semibold">Summary Mode</div>
        <div className="text-xs text-slate-400">Rangkuman poin-poin</div>
      </button>
    </div>
  )
}

