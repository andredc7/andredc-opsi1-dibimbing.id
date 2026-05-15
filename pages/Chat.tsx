import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChatMessage, Mode } from '../App'
import { buildSystemPrompt } from '../lib/prompt'
import ModeSelector from '../shared/ModeSelector'
import ChatHistory from '../shared/ChatHistory'

export default function Chat({
  course,
  onCourseChange,
  mode,
  onModeChange,
  history,
  setHistory,
  onClearSession,
}: {
  course: string
  onCourseChange: (v: string) => void
  mode: Mode
  onModeChange: (m: Mode) => void
  history: ChatMessage[]
  setHistory: (next: ChatMessage[]) => void
  onClearSession: () => void
}) {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const systemPrompt = useMemo(() => buildSystemPrompt({ course, mode }), [course, mode])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, isLoading])

  const send = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    setError(null)
    setIsLoading(true)
    setInput('')

    const nextHistory: ChatMessage[] = [
      ...history,
      { role: 'user', content: text },
    ]

    // optimistic update: show user message
    setHistory(nextHistory)

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          systemPrompt,
          messages: nextHistory.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (!resp.ok) {
        const errText = await resp.text()
        throw new Error(errText || `Request failed: ${resp.status}`)
      }

      const data = await resp.json() as { reply: string }
      setHistory([...nextHistory, { role: 'assistant', content: data.reply }])
    } catch (e: any) {
      setError(e?.message || 'Terjadi kesalahan saat memanggil AI.')
      setHistory([...nextHistory, { role: 'assistant', content: 'Maaf, terjadi kesalahan. Coba lagi ya.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    void send()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Chat Tutor AI — andredc</h1>
            <p className="mt-1 text-sm text-slate-400">
              Role AI dibentuk oleh <span className="font-medium text-slate-300">system prompt</span> + pilihan mode.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearSession}
              className="rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm hover:bg-slate-900 transition"
            >
              Clear session
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-[280px_1fr]">
          <aside className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-300">Mata kuliah</label>
                <input
                  value={course}
                  onChange={(e) => onCourseChange(e.target.value)}
                  placeholder="mis: Struktur Data, Matematika Diskrit"
                  className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <div className="text-sm text-slate-300">Mode</div>
                <div className="mt-2">
                  <ModeSelector value={mode} onChange={onModeChange} />
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                <div className="text-xs text-slate-400">Preview system prompt</div>
                <div className="mt-1 max-h-44 overflow-auto text-xs text-slate-300 whitespace-pre-wrap">
                  {systemPrompt}
                </div>
              </div>
            </div>
          </aside>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="p-4 border-b border-slate-800">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-slate-200">Conversation</div>
                  <div className="text-xs text-slate-400">History tersimpan selama sesi browser (sessionStorage).</div>
                </div>
                <div className="text-xs text-slate-400">{history.length} pesan</div>
              </div>
              {error ? <div className="mt-3 text-sm text-red-400">{error}</div> : null}
            </div>

            <div className="p-4">
              <ChatHistory messages={history} isLoading={isLoading} />
              <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t border-slate-800">
              <form onSubmit={onSubmit} className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={mode === 'QUIZ' ? 'Tulis topik atau materi untuk kuis...' : 'Tulis pertanyaan atau materi yang ingin dipelajari...' }
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 transition disabled:opacity-70"
                >
                  {isLoading ? '...' : 'Send'}
                </button>
              </form>
              <div className="mt-3 text-xs text-slate-500">
                Tips: gunakan mode <span className="font-medium text-slate-300">Quiz Mode</span> untuk soal latihan.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

