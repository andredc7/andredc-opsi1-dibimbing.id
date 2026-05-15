import andredcLogo from '../shared/andredcLogo'

export default function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-5xl px-6 py-10">

        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 grid place-items-center">
            {andredcLogo}
          </div>
          <div>
            <div className="text-sm text-slate-300">AI Study Assistant</div>
            <h1 className="text-2xl font-semibold">andredc</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <section>
            <h2 className="text-4xl font-semibold leading-tight">
              Belajar lebih cepat dengan tutor AI: jelasin, bikin kuis, dan rangkum.
            </h2>
            <p className="mt-4 text-slate-300">
              Pilih mata kuliah dan mode belajar, lalu chat seperti belajar bersama tutor.
              Session history tersimpan selama sesi browser.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-200">
                Explain Mode
              </span>
              <span className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-200">
                Quiz Mode
              </span>
              <span className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-200">
                Summary Mode
              </span>
            </div>

            <button
              onClick={onStart}
              className="mt-10 inline-flex items-center justify-center rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 transition"
            >
              Lihat Profil
            </button>



            <p className="mt-3 text-xs text-slate-400">
              Nama app: <span className="font-medium text-slate-300">andredc</span>
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="text-lg font-semibold">Fitur utama</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="text-indigo-400">✓</span>
                <span>
                  <span className="font-medium">Explain Mode</span> untuk penjelasan step-by-step.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400">✓</span>
                <span>
                  <span className="font-medium">Quiz Mode</span> untuk soal latihan + kunci jawaban.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400">✓</span>
                <span>
                  <span className="font-medium">Summary Mode</span> untuk rangkuman poin penting.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400">✓</span>
                <span>
                  <span className="font-medium">System prompt</span> memastikan AI berperan sebagai tutor belajar.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}

