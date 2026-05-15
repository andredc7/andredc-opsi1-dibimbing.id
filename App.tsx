import { useMemo, useState } from 'react'
import Landing from './pages/Landing'
import Chat from './pages/Chat'
import Profile from './pages/Profile'

type Route = 'landing' | 'profile' | 'chat'



export type Mode = 'EXPLAIN' | 'QUIZ' | 'SUMMARY'

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export default function App() {
  const [route, setRoute] = useState<Route>('landing')



  // Session state lives in sessionStorage (per-tab).
  const sessionKey = 'andredc_chat_history_v1'

  const [course, setCourse] = useState('')

  const [mode, setMode] = useState('EXPLAIN')



  const [history, setHistory] = useState(() => {

    try {
      const raw = sessionStorage.getItem(sessionKey)
      if (!raw) return []
      return JSON.parse(raw) as ChatMessage[]

    } catch {
      return []
    }
  })

  const persistHistory = useMemo(() => {
    return (next: ChatMessage[]) => {

      setHistory(next)

      try {
        sessionStorage.setItem(sessionKey, JSON.stringify(next))
      } catch {
        // ignore
      }
    }
  }, [])

  const clearSession = () => {
    try {
      sessionStorage.removeItem(sessionKey)
    } catch {
      // ignore
    }
    setHistory([])
  }

  return route === 'landing' ? (
    <Landing onStart={() => setRoute('profile')} />
  ) : route === 'profile' ? (
    <Profile onStartChat={() => setRoute('chat')} />
  ) : (

    <Chat
      course={course}
      onCourseChange={setCourse}
      mode={mode}
      onModeChange={setMode}
      history={history}
      setHistory={persistHistory}
      onClearSession={clearSession}
    />
  )

}

