import { appContext } from './createAppContext'
import { useApp } from '../hooks/useApp'

export function AppContext ({ children }) {
  const data = useApp()
  return (
    <appContext.Provider value={{ ...data }}>
      {children}
    </appContext.Provider>
  )
}
