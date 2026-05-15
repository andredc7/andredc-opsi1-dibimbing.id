import type { ChatMessage } from '../App'

export default function ChatHistory({
  messages,
  isLoading,
}: {
  messages: ChatMessage[]
  isLoading: boolean
}) {
  if (messages.length === 0) {
    return (
      <div className="py-10 text-center text-slate-400">
        Belum ada percakapan. Masukkan pertanyaan di bawah.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((m, idx) => {
        const isUser = m.role === 'user'
        return (
          <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[78%] rounded-2xl border px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                isUser
                  ? 'border-indigo-500 bg-indigo-500/15 text-slate-100'
                  : 'border-slate-800 bg-slate-950 text-slate-200'
              }`}
            >
              {m.content}
            </div>
          </div>
        )
      })}
      {isLoading ? (
        <div className="flex justify-start">
          <div className="max-w-[78%] rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300">
            Tutor sedang menjawab...
          </div>
        </div>
      ) : null}
    </div>
  )
}

