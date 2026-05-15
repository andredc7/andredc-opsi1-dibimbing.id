import type { PropsWithChildren } from 'react'

function Section({
  title,
  children,
}: {
  title: string
  children: PropsWithChildren['children']
}) {

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}

export default function Profile({ onStartChat }: { onStartChat: () => void }) {
  const skills: string[] = [
    'TypeScript',
    'React',
    'Node.js',
    'Tailwind CSS',
    'Express',
    'REST API',
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-lg font-bold text-slate-950">
              ADC
            </div>

            <div>
              <div className="text-sm text-slate-300">Personal Profile</div>
              <h1 className="text-3xl font-semibold leading-tight">
                Andre Dwiyanto Cahyana
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Frontend & Backend Developer • suka bikin yang rapi, cepat, dan mudah dipakai
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onStartChat}
              className="rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 transition"
            >
              Mulai Chat (AI)
            </button>
          </div>
        </header>

        <main className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <Section title="About Me">
              <div className="mt-3 space-y-3 text-slate-300 leading-relaxed">
                <p>
                  Halo! Saya Andre. Saya membangun aplikasi web yang fokus pada pengalaman pengguna dan
                  arsitektur yang bersih.
                </p>
                <p>
                  Saya senang belajar teknologi baru, mengubah ide jadi prototype cepat, dan
                  menyempurnakannya sampai siap dipakai.
                </p>
                <p>
                  Di proyek ini, saya juga menggabungkan fitur chat sederhana berbasis API LLM agar bisa
                  “ngobrol” dan mendapatkan bantuan belajar/eksplorasi.
                </p>
              </div>
            </Section>

            <Section title="Skills">
              <div className="mt-4 flex flex-wrap gap-3">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-slate-800 bg-slate-950/40 px-4 py-2 text-sm text-slate-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          </section>

          <aside className="space-y-6">
            <Section title="Contact">
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-300">Email</span>
                  <a
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 break-all"
                    href="mailto:dwiyantoandre99@gmail.com"
                  >
                    dwiyantoandre99@gmail.com
                  </a>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-300">LinkedIn</span>
                  <a
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 break-all"
                    href="https://www.linkedin.com/in/andre-dwiyanto-cahyana-421a0265/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/andre-dwiyanto-cahyana-421a0265
                  </a>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-300">GitHub</span>
                  <a
                    className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2 break-all"
                    href="https://github.com/andredc7"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/andredc7
                  </a>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Silakan ganti placeholder link & email sesuai profil asli.
              </p>
            </Section>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <h2 className="text-lg font-semibold">Quick Info</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>• Fokus: React + TypeScript</li>
                <li>• Backend: Node.js/Express</li>
                <li>• Styling: Tailwind CSS</li>
                <li>• Integrasi: REST API & AI proxy</li>
              </ul>
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}

